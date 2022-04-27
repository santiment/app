import { useEffect } from 'react'

export const useUpdateFinishedSteps = ({
  selectedType,
  finishedSteps,
  setFinishedSteps,
  values,
  isModalOpen,
}) => {
  const stepsLength = selectedType ? selectedType.steps.length : 1
  const nameAndDescriptionIndex = stepsLength - 1

  useEffect(() => {
    if (values.title && values.description) {
      !finishedSteps.has(nameAndDescriptionIndex) &&
        setFinishedSteps((prev) => [...prev, nameAndDescriptionIndex])
    } else {
      setFinishedSteps((prev) => prev.filter((step) => step !== nameAndDescriptionIndex))
    }
    if (values.cooldown && values.settings.channel.length > 0) {
      !finishedSteps.has(nameAndDescriptionIndex - 1) &&
        setFinishedSteps((prev) => [...prev, nameAndDescriptionIndex - 1])
    } else {
      setFinishedSteps((prev) => prev.filter((step) => step !== nameAndDescriptionIndex - 1))
    }

    if (selectedType) {
      switch (selectedType.title) {
        case 'Asset': {
          if (values.settings.metric) {
            !finishedSteps.has(1) && setFinishedSteps((prev) => [...prev, 1])
          } else {
            setFinishedSteps((prev) => prev.filter((step) => step !== 1))
          }
          const slug = values.settings.target.slug
          if (slug && (typeof slug === 'string' ? slug : slug.length > 0)) {
            !finishedSteps.has(0) && setFinishedSteps((prev) => [...prev, 0])
          } else {
            setFinishedSteps((prev) => prev.filter((step) => step !== 0))
          }
          break
        }
        case 'Watchlist': {
          if (values.settings.metric) {
            !finishedSteps.has(1) && setFinishedSteps((prev) => [...prev, 1])
          } else {
            setFinishedSteps((prev) => prev.filter((step) => step !== 1))
          }
          if (values.settings.target && values.settings.target.watchlist_id) {
            !finishedSteps.has(0) && setFinishedSteps((prev) => [...prev, 0])
          } else {
            setFinishedSteps((prev) => prev.filter((step) => step !== 0))
          }
          break
        }
        case 'Screener': {
          if (
            values.settings.operation.selector &&
            values.settings.operation.selector.watchlist_id
          ) {
            !finishedSteps.has(0) && setFinishedSteps((prev) => [...prev, 0])
          } else {
            setFinishedSteps((prev) => prev.filter((step) => step !== 0))
          }
          break
        }
        case 'Wallet address': {
          if (
            values.settings.target &&
            values.settings.target.address &&
            values.settings.selector &&
            values.settings.selector.slug &&
            values.settings.selector.infrastructure
          ) {
            !finishedSteps.has(0) && setFinishedSteps((prev) => [...prev, 0])
          } else {
            setFinishedSteps((prev) => prev.filter((step) => step !== 0))
          }
          break
        }
        case 'Social trends': {
          const slug = values.settings.target.slug
          const noSlug = typeof slug === 'string' ? !slug : slug && slug.length === 0
          const word = values.settings.target.word
          const noWord = typeof word === 'string' ? !word : word && word.length === 0
          if ((!noSlug && slug) || (!noWord && word) || values.settings.target.watchlist_id) {
            !finishedSteps.has(0) && setFinishedSteps((prev) => [...prev, 0])
          } else {
            setFinishedSteps((prev) => prev.filter((step) => step !== 0))
          }
          break
        }
        default:
          break
      }
    }
  }, [values, isModalOpen, selectedType])
}
