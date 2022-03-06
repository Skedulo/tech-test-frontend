import { useCallback, useState } from "react"

interface ISearchQueryProps {
  fetchQuery: (searchTerm: string) => Promise<Array<any>>,
}

type LoadingType = boolean
type ErrorMessageType = string | null
type DataType = Array<any> | null
type DataResponseType = Promise<Array<any> | void>

interface ErrorResponse {
  message: ErrorMessageType
}

export interface QueryOutput {
  data: DataType,
  errorMessage: ErrorMessageType,
  fetchData: (queryVariables: any) => DataResponseType,
  hasNoData: boolean,
  isLoading: LoadingType,
  setData: React.Dispatch<React.SetStateAction<DataType>>,
  setErrorMessage: React.Dispatch<React.SetStateAction<ErrorMessageType>>
}

export const useQuery = (props: ISearchQueryProps): QueryOutput => {
  const [data, setData] = useState<DataType>(null)
  const [errorMessage, setErrorMessage] = useState<ErrorMessageType>(null)
  const { fetchQuery } = props
  const [isLoading, setLoading] = useState<LoadingType>(false)

  const _onSuccess = useCallback((response): DataResponseType => {
    setLoading(false)
    setData(response)
    setErrorMessage(null)
    return response
  }, [])

  const _onError = useCallback((error: ErrorResponse): void => {
    setLoading(false)
    setErrorMessage(error.message)
  }, [])

  const fetchData = useCallback((queryVariables): Promise<Array<any>[] | void> => {
    setLoading(true)
    return fetchQuery(queryVariables)
      .then((response) => _onSuccess(response))
      .catch((error) => _onError(error))
  }, [fetchQuery, _onError, _onSuccess])

  const hasNoData: boolean = data !== null && data.length === 0;

  return {
    data,
    errorMessage,
    fetchData,
    hasNoData,
    isLoading,
    setData,
    setErrorMessage
  }
}