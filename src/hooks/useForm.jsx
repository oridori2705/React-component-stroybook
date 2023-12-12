import { useState } from 'react'

const useForm = ({ initialValues, onSubmit, validate }) => {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false) // form이 submit 중인지

  const handleChange = e => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value }) // 하나의 폼에 여러가지 input요소를 사용가능하도록 함
  }

  const handleSubmit = async e => {
    setIsLoading(true)
    e.preventDefault()
    const newErrors = validate ? validate(values) : {} //validate함수가 있을 경우에
    if (Object.keys(newErrors).length === 0) {
      await onSubmit(values)
    }
    setErrors(newErrors)
    setIsLoading(false)
  }

  return {
    values,
    errors,
    isLoading,
    handleChange,
    handleSubmit
  }
}

export default useForm
