function Post({ photo }) {
  return (
    <div className="photo__container">
      <div className="photo__header">
        <div className="photo__icon">
          <p>{photo.userId}</p>
        </div>
      </div>
      <div className="photo__image">
        {photo.filename}
      </div>
    </div>
  )
}

export default Post