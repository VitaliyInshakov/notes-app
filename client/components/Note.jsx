import React from 'react';
import './Note.less';

export default class Note extends React.Component{
   
  render() {
    const style = {backgroundColor: this.props.color};
    return (
      <div className='Note' style={style}>
        <span className='Note__del-icon' onClick={this.props.onDelete.bind(this)}> x </span>
        {
          this.props.title
          ?
            <h4 className='Note__title'>{this.props.title}</h4>
          :
            null
        }
        <div className='Note__text'>{this.props.children}</div>
      </div>
    );
  }
}