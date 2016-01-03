class ConnectionFilter extends React.Component{
  constructor(props){
    super(props);
    this.select = this.suppressTab.bind(this);
  }

  suppressTab(e){
    if (e.which == 9) { e.preventDefault(); }
  }

  render(){
    return <input
             type="text"
             className="connection-search"
             placeholder="Search for connections"
             onKeyUp={this.props.filter}
             onKeyDown={this.suppressTab} />;
  }
}


class ConnectionSuggestion extends React.Component{
  constructor(props){
    super(props);
    this.select = this.select.bind(this);
  }

  select(e){
    this.props.selectionFns.choose(this.props.connection);
  }

  render(){
    var c = this.props.connection;
    var highlighted = this.props.highlighted == this.props.connection ?
                      "connection connection--highlight" : "connection";
    return (
      <div
        onClick={this.select}
        style={
          {
            borderRight: "thin lightgray solid",
            borderLeft: "thin lightgray solid"
          }
        }>

        <div className={highlighted} key={c.id}>
          <div
            className="connection__name">
            {c.name}
          </div>
        </div>
      </div>
    );
  }
}


class ConnectionSuggestions extends React.Component {
  render() {
    var connections = this.props.connections.map( (c, i) =>
      <ConnectionSuggestion
        key={i}
        connection={c}
        highlighted={this.props.highlighted}
        selectionFns={this.props.selectionFns} />
    );
    return(
      <div
        className="connection-suggestions"
        style={
          {
            position: "absolute",
            width: "70%",
            zIndex: 9
          }
        }>
        {connections}
      </div>
    );
  }
}

class Connector extends React.Component{
  render(){
    return(
      <div>
        {this.props.connector.name}
      </div>
    );
  }
}

class Connectors extends React.Component{
  render(){
    console.log('rendering connectors');
    var connectors = this.props.connectors.map((c, i) =>
      <Connector connector={c} key={i} />
    );
    return(
      <div>
        {connectors}
      </div>
    );
  }
}

class ConnectionSearch extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      search: "",
      connections: [],
      connectors: []
    };

    this.filter = this.filter.bind(this);
    this.fetchConnections = this.fetchConnections.bind(this);
    this.fetchConnectors = this.fetchConnectors.bind(this);
    this.makeSelection = this.makeSelection.bind(this);

    this.selectionFns = {
      move: this.moveSelection,
      choose: this.makeSelection
    };
  }

  filter(e){
    switch(e.which) {
      case 9:
        this.moveSelection(e);
        break;
      case 13:
        this.makeSelection(this.state.highlighted);
        break;
      default:
        this.setState({highlighted: null});
        this.fetchConnections(e.target.value);
    }
  }

  makeSelection(connection){
    $('.connection-search').val('');
    this.fetchConnectors(connection);
  }

  fetchConnectors(connection){
    this.setState({
      connectors: [{name: 'Bob'}, {name: 'David'}],
      connections: [],
      highlighted: null
    });
  }

  getSelectionIdx(rs, step){
    var idx = rs.indexOf(this.state.highlighted);
    if (idx + step == rs.length) { return 0; }
    if (idx + step < 0)          { return rs.length - 1; }
    return idx + step;
  }

  _moveSelection(e, connections){
    var step = e.shiftKey ? -1 : 1;
    var newIdx = this.getSelectionIdx(connections, step);
    this.setState({highlighted: connections[newIdx]});
  }

  moveSelection(e){
    var suggestions = this.state.connections;
    if (!suggestions.length) { return; }
    if (this.state.highlighted){
      this._moveSelection(e, suggestions);
    } else {
      this.setState({highlighted: suggestions[0]});
    }
  }

  fetchConnections(){
    this.setState({connections: [{name: 'Jim'}, {name: 'Jane'}]});
  }

  render(){
    return(
      <div
        style={
          {
            position: "relative"
          }
        }>
        <ConnectionFilter
          filter={ this.filter } />
        <ConnectionSuggestions
          connections={ this.state.connections }
          highlighted={ this.state.highlighted }
          selectionFns={ this.selectionFns }
        />
        <h2> Possible Connectors </h2>
        <Connectors
          connectors={ this.state.connectors }
        />
      </div>
    );
  }
};
