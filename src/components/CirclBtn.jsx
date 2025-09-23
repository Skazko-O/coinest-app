
function CircleBtn({ iconHref, imgSrc, alt = '', onClick }) {
  return (
    <button className="circleBtn" onClick={onClick}>
      {iconHref && (
        <svg aria-hidden="true">
          <use href={iconHref} />
        </svg>
      )}
      {imgSrc && (
        <img src={imgSrc} alt={alt} />
      )}
    </button>
  );
}

export default CircleBtn;
