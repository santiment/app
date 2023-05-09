import { useState, useEffect, useMemo } from 'react';
import { METRICS_AMOUNT, MATRIX_SIZE } from './matrix';
import { FLOW_QUERY } from './query';
import { client } from '../../../../apollo';
const DEFAULT_STATE = [];
const DEFAULT_DAY_MATRIX = [[0, 1, 1, 1, 1, 1], [1, 0, 1, 1, 1, 1], [1, 1, 0, 1, 1, 1], [1, 1, 1, 0, 1, 1], [1, 1, 1, 1, 0, 1], [1, 1, 1, 1, 1, 0]];

const valueAccessor = ({
  value
}) => value;

const buildDataAccessor = emptyValues => ({
  data
}) => {
  const result = new Array(METRICS_AMOUNT);

  for (let i = 0; i < METRICS_AMOUNT; i++) {
    const period = data['_' + i];
    result[i] = period ? period.timeseriesData.map(valueAccessor) : emptyValues;
  }

  return result;
};

const getPeriodFlow = (variables, emptyValues) => client.query({
  query: FLOW_QUERY,
  variables
}).then(buildDataAccessor(emptyValues));

export function usePeriodMatrix(slug, [from, to], daysAmount) {
  const [periodMatrix, setPeriodMatrix] = useState(DEFAULT_STATE);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    const emptyValues = new Array(daysAmount).fill(0);
    getPeriodFlow({
      slug,
      from: from.toISOString(),
      to: to.toISOString()
    }, emptyValues).then(data => {
      const result = new Array(MATRIX_SIZE);

      for (let i = 0, y = 0; i < MATRIX_SIZE; i++, y += MATRIX_SIZE) {
        result[i] = data.slice(y, y + MATRIX_SIZE);
      }

      return result;
    }).then(setPeriodMatrix).then(() => setIsLoading(false));
  }, [slug, from, to]);
  return {
    periodMatrix,
    isLoading
  };
}
export const useDayMatrix = (periodMatrix, dayIndex = 0) => useMemo(() => {
  const matrix = periodMatrix.map(periods => periods.map(values => values[dayIndex]));
  const isEmpty = matrix.flat().filter(Boolean).length === 0;
  return {
    matrix: isEmpty ? DEFAULT_DAY_MATRIX : matrix,
    isEmpty
  };
}, [periodMatrix, dayIndex]);
export function useAnimatedDayIndex(daysAmount, shouldStop) {
  const [dayIndex, setDayIndex] = useState(0);
  useEffect(() => {
    if (shouldStop || daysAmount === 1) return;
    const interval = setInterval(() => setDayIndex(index => ++index % daysAmount), 1500);
    return () => clearInterval(interval);
  }, [daysAmount, shouldStop]);
  return [dayIndex, setDayIndex];
}