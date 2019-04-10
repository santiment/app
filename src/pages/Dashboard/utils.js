export const getOnboardingCompletedTasks = () =>
  JSON.parse(localStorage.getItem('onboardingCompleted') || '[]')

export const completeOnboardingTask = task => {
  const completed = new Set(getOnboardingCompletedTasks())
  completed.add(task)

  localStorage.setItem('onboardingCompleted', JSON.stringify([...completed]))
}
