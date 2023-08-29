export const getEnv = () => {
  const imp = import.meta.env

  return {
    ...imp
  }
}
