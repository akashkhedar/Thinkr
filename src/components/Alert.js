export default function Alert(props) {
  return (
    <div style={{ height: "2rem" }}>
      {props.alert && (
        <div
          className={`alert alert-${props.alert.type} alert-dismissible fade show text-center`}
          role="alert"
        >
          {props.alert.message}
        </div>
      )}
    </div>
  );
}
