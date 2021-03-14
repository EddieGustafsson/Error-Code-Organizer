import React, { Component } from 'react';
import ReactTimeAgo from 'react-time-ago';
import { Label, Button, Icon } from 'semantic-ui-react';
import DataTable from 'react-data-table-component';
import JavascriptTimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

import CreateErrorCodeModal from '../modals/CreateErrorCodeModal';

export default class ErrorCodesTable extends Component {
  render() {

    const projectId = this.props.projectId;
    const errorCodeData = this.props.errorCodeData;

    JavascriptTimeAgo.addLocale(en);

    const columns = [
      {
        name: 'Code',
        selector: 'code',
        sortable: true,
      },
      {
        name: 'Location',
        selector: 'location',
        sortable: true,
        cell: row => <Label basic as='a'>{row.location}</Label>,
      },
      {
        name: 'Message',
        selector: 'message',
        sortable: true,
      },
      {
        name: 'Description',
        selector: 'description',
        sortable: true,
      },
      {
        name: 'Last updated',
        selector: 'last_updated_at',
        sortable: true,
        right: true,
        cell: row => <ReactTimeAgo date={row.last_updated_at} locale="en" />,
      },
    ];

    const actions = <CreateErrorCodeModal projectId={projectId} />;

    const contextActions = <Button icon negative floated='right' labelPosition='left'>
                              <Icon name='remove' />
                                Delete error code
                              </Button>;

    return (
      <div>
        <DataTable
          columns={columns}
          data={errorCodeData}
          noHeader={false}
          striped={true}
          actions={actions}
          contextActions={contextActions}
          selectableRows
          highlightOnHover
          pagination
        />
      </div>
    );
  }
}
