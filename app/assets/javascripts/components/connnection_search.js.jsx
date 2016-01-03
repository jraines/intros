class ConnectionFilter extends React.Component{
  constructor(props){
    super(props);
    this.select = this.suppressTab.bind(this);
  }

  suppressTab(e){
    if (e.which == 9) { e.preventDefault(); }
  }

  render(){
    return(
      <div className="form-group" >
        <input
          type="text"
          className="connection-search"
          placeholder="Search for a person or company"
          onKeyUp={this.props.filter}
          onKeyDown={this.suppressTab} />
      </div>
    );
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
        >

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
    if (!connections.length){
      return null;
    }
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
        {this.props.connector.first_name} {this.props.connector.last_name}, {this.props.connector.yc_class}
      </div>
    );
  }
}

class Connectors extends React.Component{
  render(){
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
    var term = e.target.value;
    switch(e.which) {
      case 9:
        this.moveSelection(e);
        break;
      case 13:
        this.makeSelection(this.state.highlighted);
        break;
      default:
        this.setState({highlighted: null});
        if (term.length >= 2){
          this.fetchConnections(e.target.value);
        }
    }
  }

  fetchConnections(term){
    if (term.length){
      var that = this;
      $.getJSON('/connections_search/' + term, function(data){
        that.setState({connections: data});
      });
    } else{
      this.setState({connections: []});
    }
  }

  makeSelection(connection){
    $('.connection-search').val('');
    this.setState({connections: []});
    this.fetchConnectors(connection);
  }

  fetchConnectors(connection){
    var that = this;
    $.getJSON(`/connectors?name=${connection.name}&type=${connection.type}`, function(data){
      that.setState({
        connectors: data
      });
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


  render(){
    var connectorHeader;
    if (this.state.connectors.length){
      connectorHeader = <h2> Possible Connectors </h2>;
    } else{
      connectorHeader = null;
    }
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
        {connectorHeader}
        <Connectors
          connectors={ this.state.connectors }
        />
      </div>
    );
  }
};
