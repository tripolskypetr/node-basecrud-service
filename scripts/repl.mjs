import { errorData } from 'functools-kit'

import "../build/index.mjs";

Object.getPrototypeOf(ioc.errorService).handleGlobalError = (error) => {
  console.error(errorData(error))
}
