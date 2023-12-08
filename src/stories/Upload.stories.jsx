import Upload from '../components/Upload'

export default {
  title: 'Component/Upload',
  component: Upload
}

export const Default = () => {
  return (
    <Upload>{file => <button>{file ? file.name : 'Click me'}</button>}</Upload>
  )
}
