import * as React from "react";
import "@cloudscape-design/global-styles/index.css"
import Textarea from "@cloudscape-design/components/textarea"
import Button from "@cloudscape-design/components/button"
import Form from "@cloudscape-design/components/form"
import FormField from "@cloudscape-design/components/form-field"
import SpaceBetween from "@cloudscape-design/components/space-between"
import Container from "@cloudscape-design/components/container"
import Header from "@cloudscape-design/components/header"
import Input from "@cloudscape-design/components/input"
import {useState} from "react";

function TodoListForm({ onSaveText }) {
    const [value, setValue] = useState('');


    const handleInputChange = (e) => {
        setValue(e.target.value);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        onSaveText(value);
        setValue('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <Form
                actions={
                    <SpaceBetween direction="horizontal" size="xs">
                        <Button formAction="none" variant="link">
                            Cancel
                        </Button>
                        <Button variant="primary">Submit</Button>
                    </SpaceBetween>
                }
                // header={<Header variant="h1">Form header</Header>}
            >
                <Container
                    header={
                        <Header variant="h2">
                            What's on your todo list?
                        </Header>
                    }
                >
                    <SpaceBetween direction="vertical" size="l">
                        <FormField>
                            <Input
                                type="text"
                                placeholder="Enter your title here"
                                value={value}
                                onChange={event => setValue(event.detail.value)}
                            />
                        </FormField>
                        <Textarea
                            value={value}
                            type="text"
                            placeholder="Enter your todo list here"
                            onChange={event => setValue(event.detail.value)}
                        />
                    </SpaceBetween>
                </Container>
            </Form>
        </form>
    );
}

export default TodoListForm;