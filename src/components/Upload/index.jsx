import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { useRef, useState } from 'react'

const Input = styled.input`
  display: none;
`

const Upload = ({
  children,
  droppable,
  name,
  accept,
  value,
  onChange,
  ...props
}) => {
  const [file, setFile] = useState(value)
  const [dragging, setDragging] = useState(false)

  //파일 업로드 input태그를 꾸미기 위해서는
  //보이지 않게 한 뒤 useRef로 input태그에 접근한다.
  const inputRef = useRef(null)

  const handleChooseFile = () => {
    inputRef.current.click()
  }
  const handleFileChange = e => {
    const files = e.target.files
    const changedFile = files[0] //파일 여러개가 선택되어도 첫 번째 파일만
    setFile(changedFile)
    onChange && onChange(changedFile)
  }

  const handleDragEnter = e => {
    if (!droppable) return

    e.preventDefault() // 브라우저 기본이벤트 막기
    e.stopPropagation() // 이벤트 전파 막기

    //e.dataTransfer.items : 드래그한 요소가 있을 때
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDragging(true)
    }
  }
  const handleDragLeave = e => {
    if (!droppable) return
    e.preventDefault()
    e.stopPropagation()
    setDragging(false)
  }
  // 이벤트 전파를 막기위한 handleDragover함수
  const handleDragOver = e => {
    if (!droppable) return
    e.preventDefault()
    e.stopPropagation()
  }
  const handleFileDrop = e => {
    if (!droppable) return
    e.preventDefault()
    e.stopPropagation()

    const files = e.dataTransfer.files
    const changeFile = files[0]
    setFile(changeFile)
    onChange && onChange(changeFile)
    setDragging(false)
  }

  return (
    <div
      onClick={handleChooseFile}
      onDrop={handleFileDrop}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      {...props}>
      <Input
        ref={inputRef}
        type="file"
        name={name}
        accept={accept}
        onChange={handleFileChange}
      />
      {/* 부모로 넘기는 것은 onChange를 받아오면 되는데 자식으로는 어떻게보내야할까?
          아래와 같이
          자식요소가 jsx 반환하는 함수일 경우 함수에 file을 인수로 넣어서 보내주고, 아니라면 node인 children을 보여준다.
          */}
      {typeof children === 'function' ? children(file, dragging) : children}
    </div>
  )
}

Upload.propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.string,
  droppable: PropTypes.bool,
  accept: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
}
export default Upload
