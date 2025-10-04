import Button from 'react-bootstrap/Button';

function BlockBtn({
  label = 'Add New Recipient',
  isActive = false, 
  onClick,
  style,
  className, }) {
  return (
    <div className="d-grid">
      <Button
        variant={isActive ? 'primary' : 'light'}
        onClick={onClick}
        size="lg"
        style={style}
        className={className}
      >
        {label}
      </Button>
    </div>
  );
}

export default BlockBtn;