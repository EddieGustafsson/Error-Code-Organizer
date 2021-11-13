import React, { Component } from 'react';
import Avatar from 'react-avatar';
import ReactTimeAgo from 'react-time-ago';
import DataTable from 'react-data-table-component';
import JavascriptTimeAgo from 'javascript-time-ago';
import { Link } from 'react-router-dom';
import en from 'javascript-time-ago/locale/en';

export default class ProjcetsTable extends Component {
  render() {

    JavascriptTimeAgo.addLocale(en);

    const columns = [
        {
            name: 'Title',
            selector: 'title',
            sortable: true,
            cell: row => <div><Avatar maxInitials='1' name={row.title} verticalAlign='middle' size='30px' round='5px' /><Link to={`/project/${row._id}`}> {row.title}</Link></div>,
        },
        {
            name: 'Last updated',
            selector: 'date',
            sortable: true,
            right: true,
            cell: row => <ReactTimeAgo date={row.last_updated_at} locale="en" />,
        },
    ];

    return (
      <div>
        <DataTable
            columns={columns}
            data={this.props.projectsData}
            noHeader={true}
            striped={true}
            pagination
        />
      </div>
    );
  }
}
