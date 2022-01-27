import classes from "./MapMarker.module.css";

const MapMarker = ({ lat, lng }) => {
  return (
    <div lat={lat} lng={lng} className={classes.parent}>
      <div className={classes.pin}>
        <div className={classes.pulse}></div>
      </div>
    </div>
  );
};

export default MapMarker;
