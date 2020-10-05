import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react'

export default class ProjectSettingsForm extends Component {
    render() {
        return (
            <div>
                {[this.props.data].map(data=> (
                    <Form>
                        <Form.Group>
                            <Form.Input
                                label='Project name' 
                                name='title'
                                value={data.project.title}
                                width='10'
                            />
                            <Form.Input
                                label='Project ID' 
                                name='_id'
                                value={data.project._id}
                                width='5'
                                readOnly
                            />
                        </Form.Group>
                        <Form.Field>
                            <Form.TextArea 
                                label='Project description' 
                                placeholder='Description format' 
                                name='description'
                                width='15'
                                rows={6}
                                value={data.project.description}
                            />
                        </Form.Field>
                        <Button positive type='submit'>Save changes</Button>
                    </Form>
                ))}
            </div>
        )
    }
  }
