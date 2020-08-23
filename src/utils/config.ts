import config from 'config'

export const useConfig = (key: string) => config.get(key)

export const useConfigDefault = (key: string): string => {
  if (config.has(key)) return config.get(key)
  return 'INSERT_ENV_VARIABLE'
}
