
function SqearBtn({ iconHref, imgSrc, alt = '', onClick }) {
  return (
    <div className="sqearBtn" onClick={onClick} role="button" aria-label={alt}>
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

export default SqearBtn;
