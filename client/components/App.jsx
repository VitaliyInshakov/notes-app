import React from 'react';
import NotesStore from '../stores/NotesStores';
import NotesActions from '../actions/NotesActions';
import NoteEditor from './NoteEditor.jsx';
import NotesGrid from './NotesGrid.jsx';
import './App.less';

function getStateFromFlux() {
  return {
    isLoading: NotesStore.isLoading(),
    notes: NotesStore.getNotes()
  }
}

export default class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = getStateFromFlux();
  }

  componentWillMount() {
    NotesActions.loadNotes();
  }

  componentDidMount() {
    NotesStore.addChangeListener(this._onChange.bind(this));
  }

  componentWillUnmount() {
    NotesStore.removeChangeListener(this._onChange.bind(this));
  }

  handleNoteAdd(data) {
    NotesActions.createNote(data);
  }

  handleNoteDelete(note) {
    NotesActions.deleteNote(note.id);
  }

  _onChange() {
    this.setState(getStateFromFlux());
  }
  render() {
    return (
      <div className="App">
        <h2 className="App__header">NotesApp</h2>
        <NoteEditor onNoteAdd={this.handleNoteAdd.bind(this)} />
        <NotesGrid notes={this.state.notes} onNoteDelete={this.handleNoteDelete.bind(this)}/>
      </div>
    );
  }
}