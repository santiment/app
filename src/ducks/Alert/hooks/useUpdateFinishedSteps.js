import { useEffect } from "react";

export const useUpdateFinishedSteps = ({
  selectedType,
  finishedSteps,
  setFinishedSteps,
  values
}) => {
  const stepsLength = selectedType.steps.length;
  const nameAndDescriptionIndex = stepsLength - 1;

  useEffect(() => {
    if (values.title && values.description) {
      !finishedSteps.has(nameAndDescriptionIndex) &&
        setFinishedSteps(prev => [...prev, nameAndDescriptionIndex]);
    } else {
      setFinishedSteps(prev =>
        prev.filter(step => step !== nameAndDescriptionIndex)
      );
    }
    if (values.cooldown && values.settings.channel.length > 0) {
      !finishedSteps.has(nameAndDescriptionIndex - 1) &&
        setFinishedSteps(prev => [...prev, nameAndDescriptionIndex - 1]);
    } else {
      setFinishedSteps(prev =>
        prev.filter(step => step !== nameAndDescriptionIndex - 1)
      );
    }

    switch (selectedType.title) {
      case "Asset": {
        if (values.settings.metric) {
          !finishedSteps.has(1) && setFinishedSteps(prev => [...prev, 1]);
        } else {
          setFinishedSteps(prev => prev.filter(step => step !== 1));
        }
        const slug = values.settings.target.slug;
        if (
          typeof slug === "string"
            ? slug
            : values.settings.target.slug.length > 0
        ) {
          !finishedSteps.has(0) && setFinishedSteps(prev => [...prev, 0]);
        } else {
          setFinishedSteps(prev => prev.filter(step => step !== 0));
        }
        break;
      }
      case "Watchlist": {
        if (values.settings.metric) {
          !finishedSteps.has(1) && setFinishedSteps(prev => [...prev, 1]);
        } else {
          setFinishedSteps(prev => prev.filter(step => step !== 1));
        }
        if (values.settings.target.watchlist_id) {
          !finishedSteps.has(0) && setFinishedSteps(prev => [...prev, 0]);
        } else {
          setFinishedSteps(prev => prev.filter(step => step !== 0));
        }
        break;
      }
      case "Screener": {
        if (
          values.settings.operation.selector &&
          values.settings.operation.selector.watchlist_id
        ) {
          !finishedSteps.has(0) && setFinishedSteps(prev => [...prev, 0]);
        } else {
          setFinishedSteps(prev => prev.filter(step => step !== 0));
        }
        break;
      }
      default:
        break;
    }
  }, [values]);
};
