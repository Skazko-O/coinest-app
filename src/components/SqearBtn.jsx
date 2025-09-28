
function SqearBtn({ iconHref, imgSrc, alt = '', onClick }) {
  return (
    <button className="sqearBtn" onClick={onClick}>
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

export default SqearBtn;
