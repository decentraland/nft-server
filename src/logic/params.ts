type Values = { [key: string]: string | Function | object }

export class Params {
  constructor(public params: URLSearchParams) {}

  getString(key: string, defaultValue?: string) {
    const value = this.params.get(key)
    return value === null ? defaultValue : value
  }

  getList<T extends string = string>(
    key: string,
    values: Record<string, T> = {}
  ) {
    const list = this.params.getAll(key) as T[]
    const validValues = this.getValidValues(values)
    return validValues.length > 0
      ? list.filter((value) => validValues.includes(value))
      : list
  }

  getNumber(key: string, defaultValue?: number) {
    const value = this.params.get(key)
    if (value !== null) {
      const parsed = parseFloat(value)
      if (!isNaN(parsed)) {
        return parsed
      }
    }
    return defaultValue
  }

  getBoolean(key: string) {
    const value = this.params.get(key)
    return value !== null
  }

  getValue<T extends string>(
    key: string,
    values: Values = {},
    defaultValue?: T
  ) {
    const value = this.getString(key, defaultValue)
    if (value) {
      const validValues = this.getValidValues(values)
      if (validValues.length === 0 || validValues.includes(value as T)) {
        return value as T
      }
    }
    return defaultValue
  }

  getAddress(key: string, lowercase = true) {
    const value = this.params.get(key)
    if (value && /^0x[a-fA-F0-9]{40}$/.test(value)) {
      return lowercase ? value.toLowerCase() : value
    }
    return
  }

  getAddressList(key: string, lowercase = true) {
    const list = this.params
      .getAll(key)
      .filter((address) => /^0x[a-fA-F0-9]{40}$/.test(address))

    return lowercase ? list.map((address) => address.toLowerCase()) : list
  }

  private getValidValues<T extends string>(values: Values = {}) {
    const validValues = Object.values(values).filter(
      (value) => typeof value !== 'string'
    ) as T[]
    return validValues
  }
}
