import React, { Component } from 'react';
import Async from 'react-async';
import ReactTimeAgo from 'react-time-ago';
import { Label, Segment, Message, Button, Icon } from 'semantic-ui-react';
import DataTable from 'react-data-table-component';
import API from "../../api/apiMap";
import JavascriptTimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

import CreateErrorCodeModal from '../modals/CreateErrorCodeModal';

export default class ErrorCodesTable extends Component {
    render() {
        const projectId = this.props.projectId;

        JavascriptTimeAgo.addLocale(en);

        const fetchErrorCodes = () => fetch( API.error_codes + projectId)
                      .then(res => (res.ok ? res : Promise.reject))
                      .then(res => res.json());
    
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
                name: 'Last updated at',
                selector: 'last_updated_at',
                sortable: true,
                right: true,
                cell: row => <ReactTimeAgo date={row.last_updated_at} locale="en"/>,
            },
          ];

        const actions = <CreateErrorCodeModal projectId={projectId}/>;

        const contextActions =  <Button icon negative floated='right' labelPosition='left'>
                                    <Icon name='remove' />
                                    Delete error code
                                </Button>;
    
        return (
            <Async promiseFn={fetchErrorCodes}>
                <Async.Loading>
                    <Segment loading vertical>
                        <br></br>
                        <br></br>
                    </Segment>
                </Async.Loading>
    
                <Async.Fulfilled>
                    {data => {
                        return (
                        <div>
                            <DataTable
                                columns={columns}
                                data={data.error_codes}
                                noHeader={false}
                                striped={true}
                                actions={actions}
                                contextActions={contextActions}
                                selectableRows
                                highlightOnHover
                                pagination
                            />
                        </div>
                        )
                    }}
                </Async.Fulfilled>
    
                <Async.Rejected>
                  <Message 
                      error
                      header='Could not fetch error codes'
                      content='Reload the page and try again.'
                  />
                </Async.Rejected>
            </Async>
        );
    }
}
