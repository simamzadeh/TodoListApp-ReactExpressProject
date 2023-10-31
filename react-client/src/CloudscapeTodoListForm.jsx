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

export default () => {
    return (
        <form onSubmit={e => e.preventDefault()}>
            <Form
                actions={
                    <SpaceBetween direction="horizontal" size="xs">
                        <Button formAction="none" variant="link">
                            Cancel
                        </Button>
                        <Button variant="primary">Submit</Button>
                    </SpaceBetween>
                }
                header={<Header variant="h1">Form header</Header>}
            >
                <Container
                    header={
                        <Header variant="h2">
                            Form container header
                        </Header>
                    }
                >
                    <SpaceBetween direction="vertical" size="l">
                        <FormField label="First field">
                            <Input />
                        </FormField>
                        <FormField label="Second field">
                            <Input />
                        </FormField>
                        <FormField label="Third field">
                            <Input />
                        </FormField>
                    </SpaceBetween>
                </Container>
            </Form>
        </form>
    );
}