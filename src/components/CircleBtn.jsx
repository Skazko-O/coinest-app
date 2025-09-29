
function CircleBtn({ iconHref, imgSrc, alt = '', onClick }) {
  return (
    <div className="circleBtn" role="button" onClick={onClick} aria-label={alt}>
      {iconHref && (
        <svg aria-hidden="true">
          <use href={iconHref} />
        </svg>
      )}
      {imgSrc && (
        <img src={imgSrc} alt={alt} />
      )}
    </div>
  );
}

export default CircleBtn;
