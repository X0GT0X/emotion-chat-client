import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Alert from '@material-ui/lab/Alert';
import {bindActionCreators} from "redux";
import * as actionCreators from "../actions/data";
import connect from "react-redux/es/connect/connect";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import {DropzoneArea} from 'material-ui-dropzone'
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
  drop: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& p': {
      fontFamily: 'Roboto, sans-serif',
      fontSize: '16px',
      color: theme.palette.text.primary,
      marginBottom: 0
    }
  },
});

function mapStateToProps(state) {
  return {
    token: state.auth.token,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

class EditPhotoDialog extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      src: null,
      crop: {
        unit: "%",
        width: 100,
        aspect: 1
      },
      error: ''
    };

    this.handleSave = this.handleSave.bind(this);
    this.onSelectFile = this.onSelectFile.bind(this);

  }

  onSelectFile = files => {
    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        this.setState({src: reader.result})
      );
      reader.readAsDataURL(files[0]);
    }
  };

  // If you setState the crop in here you should return false.
  onImageLoaded = image => this.imageRef = image;

  onCropChange = (crop) => this.setState({crop});

  getCroppedImg(image, crop) {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          console.error("Canvas is empty");
          return;
        }

        let data = new FormData();
        data.append('file', blob, 'profile_photo.jpg');

        resolve(data);
      }, "image/jpeg");
    });
  }


  async handleSave() {

    if (this.imageRef) {
      await this.getCroppedImg(
        this.imageRef,
        this.state.crop
      ).then(data => {
        this.props.handleUpdatePhoto(data);
        this.handleClose();
      });
    }
    else this.setState({
      error: 'Please choose the file.'
    });
  }

  handleClose = () => {
    this.setState({
      src: null,
    });
    this.props.setOpen(false);
  };

  render() {

    const {classes} = this.props;
    const {crop, croppedImageUrl, src} = this.state;

    return (
      <Dialog
        open={this.props.open}
        onClose={this.handleClose}
        aria-labelledby="add-chat-dialog-title"
        aria-describedby="add-chat-dialog-description"
        maxWidth='xs'
        fullWidth={true}
      >
        <DialogTitle id="add-chat-dialog-title">{"Choose New Photo"}</DialogTitle>
        <DialogContent>
          {
            this.props.error || this.state.error ?
              <Alert severity="error">
                {this.props.error ? this.props.error : this.state.error}
              </Alert> : null
          }
          {
            !this.state.src ? <DropzoneArea
              onChange={this.onSelectFile}
              acceptedFiles={['image/*']}
              filesLimit={1}
              showPreviewsInDropzone={false}
              dropzoneClass={classes.drop}
            /> : null
          }
          {src && (
            <ReactCrop
              src={src}
              crop={crop}
              ruleOfThirds
              onImageLoaded={this.onImageLoaded}
              onChange={this.onCropChange}
            />
          )}
          {croppedImageUrl && (
            <img alt="Crop" style={{maxWidth: "100%"}} src={croppedImageUrl}/>
          )}

        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleSave} color="primary">Save</Button>
          <Button onClick={this.handleClose} color="primary" autoFocus>Cancel</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EditPhotoDialog));