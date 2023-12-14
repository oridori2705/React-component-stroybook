const Posts = ({ initialValue }) => {
  return (
    <ul>
      {initialValue.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}

export default Posts
