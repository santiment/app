receivedArray = i.chart.scrubbed
s = 0
resultArray = []
someKindOfPropName = i.name // "‌ma‌ (50,C,ma,0)"

for (var b in i.outputs) {
  Rt.u6d(0)
  someKindOfPropName = Rt.a6d(' ', b, someKindOfPropName)
}

h = i.inputs.Field
if (h === 'field') {
  h = 'Close'
}

offset_int = parseInt(i.inputs.Offset, 10)
if (isNaN(offset_int)) {
  offset_int = 0
}

g = i.startFrom
f = offset_int

for (iterationIndex = i.startFrom - 1; iterationIndex >= 0; iterationIndex--) {
  if (
    ((p = receivedArray[iterationIndex][h]) &&
      typeof p === 'object' &&
      (p = p[i.subField]),
    p || p === 0)
  ) {
    if (f > 0) {
      f--
      g = iterationIndex
    } else {
      if (resultArray.length == i.days - 1) {
        break
      }
      s += p
      resultArray.unshift(p)
    }
  }
}

for (
  resultArray.length < i.days - 1 && ((resultArray = []), (g = 0)),
  m = [],
  iterationIndex = g;
  iterationIndex < receivedArray.length;
  iterationIndex++
) {
  ;(p = receivedArray[iterationIndex][h]) &&
    typeof p === 'object' &&
    (p = p[i.subField]),
  (y =
      iterationIndex + offset_int >= 0 &&
      iterationIndex + offset_int < receivedArray.length
        ? receivedArray[iterationIndex + offset_int]
        : null),
  p || p === 0
    ? ((s += p),
    resultArray.push(p),
    resultArray.length > i.days && (s -= resultArray.shift()),
    (v = resultArray.length == i.days ? s / i.days : null),
    y
      ? (y[someKindOfPropName] = v)
      : iterationIndex + offset_int >= receivedArray.length &&
            (((d = {})[someKindOfPropName] = v), m.push(d)))
    : y
      ? (y[someKindOfPropName] = null)
      : iterationIndex + offset_int >= receivedArray.length &&
        (((d = {})[someKindOfPropName] = null), m.push(d))
}
