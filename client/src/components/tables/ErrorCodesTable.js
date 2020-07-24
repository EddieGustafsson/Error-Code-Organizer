import React, { Component } from 'react';
import Moment from 'moment';
import Async from 'react-async';
import { Label, Segment, Message } from 'semantic-ui-react';
import DataTable from 'react-data-table-component';

export default class ErrorCodesTable extends Component {
    render() {
        const projectId = this.props.projectId;

        const fetchErrorCodes = () => fetch(`/v1/error_codes/${projectId}`)
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
                cell: row => Moment(row.date).format('YYYY-MM-DD, HH:MM'),
            },
          ];
    
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
                                noHeader={true}
                                striped={true}
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
