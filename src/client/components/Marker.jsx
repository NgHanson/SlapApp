import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

// MOVE THESE INTO A CSS
const temp = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '50px',
  height: '50px',
  lineHeight: '50px',
  backgroundColor: '#99ccff',
  border:' 2px solid #fff',
  borderRadius: '100%',
  transform: 'translate(-50%, -50%)',
  textAlign: 'center',
  cursor: 'pointer',
};

const temp2 = {
  position: 'absolute',
  width: '160px',
  height: '240px',
  lineHeight: '50px',
  backgroundColor: '#fff',
  border:' 2px solid #fff',
  textAlign: 'center',
  cursor: 'pointer',
};

export default class Marker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
    };
  }

  closeModal = () => {
    this.setState({modalOpen: false});
  }

  toggleModal() {
    this.setState((prevState) => ({ modalOpen: !prevState.modalOpen}));
  }

  render() {
    const {
      changeViewType,
      userType,
      viewType,
      lot_id,
      addPlace
    } = this.props;

    return (
      <div>
        {this.state.modalOpen && <MarkerModal addPlace={addPlace} lot_id={lot_id} closeModal={this.closeModal} userType={userType} changeViewType={changeViewType} viewType={viewType}/>}
        <div style={temp} onClick={()=>this.toggleModal()}>
          {this.props.text}
        </div>
      </div>
    );
  }
}

class MarkerModal extends Component {
  constructor(props) {
    super(props)
  }
  _onClick = () => {
      console.log("markermodel onclick")
      const query_string = '/api/devices/fromlot/'+this.props.lot_id
      const self = this
      console.log(query_string)
      fetch(query_string)
      .then(res => res.json())
      .then(function(res) {
        console.log(res.devices);
        let placelist = res.devices;
        let locationsToMark = []
        for (let i = 0; i < placelist.length; i++) {
          locationsToMark.push({id: placelist[i].device_id,
                                active: placelist[i].active,
                                geometry: {
                                  location: {
                                    lat: placelist[i].lat,
                                    lng: placelist[i].lng
                                  },
                                  rotation: placelist[i].rotation_degrees,
                                }
                              });
        }
        self.props.addPlace([]);
        self.props.changeViewType(2); 
        self.props.addPlace(locationsToMark);
      })
      // .then(res => this.setState({parkingAreas: res['parkingAreas']}));
      
  }
  render() {
    const {
      closeModal,
      changeViewType,
      userType,
      viewType,
    } = this.props;

    
  
    // More Details button brings you to the lot view
    return (
      <div style={temp2} onClick={() => closeModal()}>
        <Button variant={"secondary"} style={{fontSize: '11pt'}} onClick={()=>this._onClick()} >
          {`More Details - Current View ${viewType}`}
        </Button>
      </div>
    );
  }
}
