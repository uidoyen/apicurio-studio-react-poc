import React, {useState, useContext} from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Card,
  CardBody,
  Form,
  FormGroup,
  Split,
  SplitItem,
  TextInput,
  TextArea,
  TextContent,
  Text,
  TextVariants,
  TextList,
  TextListItem,
  FormSelectOption,
  FormSelect,
  ActionGroup,
  Title,
  PageSection,
  PageSectionVariants } from '@patternfly/react-core';
import './importApi.css';
import MonacoEditor from 'react-monaco-editor';
import { Services } from './../../common';
import {ImportApi} from "@apicurio/models";
import { GlobalContext, GlobalContextObj } from '../../../context';
import { Redirect } from "react-router-dom";

export const ImportApi = () => {

  const apisService = Services.getInstance().apisService;
  const globalContext: GlobalContextObj = useContext(GlobalContext);

  const options = [
    { value: 'URL', label: 'Import from URL', disabled: false },
    { value: 'SourceControl', label: 'Import from Source Control', disabled: false },
    { value: 'Clipboard', label: 'Import from File/Clipboard', disabled: false}
  ];

  const [importType, setImportType] = React.useState(options[0].value);
  const [textInputUrl1, setTextInputUrl1] = React.useState('');
  const [textInputUrl2, setTextInputUrl2] = React.useState('');
  const [textInputClipboard, setTextInputClipboard] = React.useState('');
  const [isValidTextInput1, setIsValidTextInput1] = React.useState(true);
  const [isValidTextInput2, setIsValidTextInput2] = React.useState(true);
  const [helperTextInvalid1, setHelperTextInvalid1] = React.useState('');
  const [helperTextInvalid2, setHelperTextInvalid2] = React.useState('');
  const [importing, setImporting] = useState(false);
  const [importError, setImportError] = useState(null);
  const [redirect, setRedirect] = useState(''); 

  const onSelectChange = (importType: string) => {
    setImportType(importType);
  };

  const handleTextInputChange1 = (textInputUrl1: string) => {
    setTextInputUrl1(textInputUrl1);
    if (textInputUrl1 === '') {
      setIsValidTextInput1(false);
      setHelperTextInvalid1('URL is required.');
    }
    else {
      if (validateURL(textInputUrl1)) {
        setIsValidTextInput1(true);
      }
      else {
        setIsValidTextInput1(false);
        setHelperTextInvalid1('Please enter a valid URL.');
      }
    }
  };

  console.log('is text 1 valid' + isValidTextInput1);
  console.log('is text 2 valid' + isValidTextInput2)

  const handleTextInputChange2 = (textInputUrl2: string) => {
    setTextInputUrl2(textInputUrl2);
    if (textInputUrl2 === '') {
      setIsValidTextInput2(false);
      setHelperTextInvalid2('URL is required.');
    }
    else {
      if (validateURL(textInputUrl2)) {
        setIsValidTextInput2(true);
      }
      else {
        setIsValidTextInput2(false);
        setHelperTextInvalid2('Please enter a valid URL.');
      }
    }
  }

  const handleTextInputChange3 = (textInputClipboard: string) => {
    setTextInputClipboard(textInputClipboard);
  }

  // Text Editor
  const monacoOnChange = (newValue, e) => {
    console.log('onChange', newValue, e);
  }

  const editorDidMount = (editor, monaco) => {
    console.log('editorDidMount', editor);
    editor.focus();
  }

  const monacoOptions = {
    selectOnLineNumbers: true
  };

  const validateURL = (url: string) => {
    const regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    if (regexp.test(url)) {
      return true;
    }
    else {
      return false;
    }
  }

  // On handle submit, check if the form is valid, and call the onCreateApi method
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('does the submit work');
    if(importType === options[0].value) {
      if (isValidTextInput1) {
        console.log('does it try to call the first api');
        onImportApi(e);
      }
    }
    else if(importType === options[1].value) {
      if (isValidTextInput2) {
        console.log('does it try to call the second api');
        onImportApi(e);
      }
    }
  };

  const onImportApi = (api: ImportApi) => {
    console.log('does it get inside import api');
    // setImporting(true);
    // setImportError(null);
    // console.log("[ImportApiPageComponent] onImportApi(): " + JSON.stringify(api));
    apisService.importApi(api).then(api => {
      console.info("[ImportApiPageComponent] Navigating to: Apis");
      // setRedirect('/');
    }).catch(error => {
      console.error("[CreateApiPageComponent] Error creating an API");
      setImporting(false);
      if (error.status === 404) {
        setImportError(error);
      }
      else {
        setImportError(error);
      }
    })
  };

//   public onImportApi(api: ImportApi) {
//     this.importing = true;
//     this.importError = null;
//     console.log("[ImportApiPageComponent] onImportApi(): " + JSON.stringify(api))
//     this.apis.importApi(api).then(importedApi => {
//         let link: string[] = [ "/apis", importedApi.id ];
//         console.info("[ImportApiPageComponent] Navigating to: %o", link);
//         this.router.navigate(link);
//     }).catch( error => {
//         console.error("[ImportApiPageComponent] Error importing API: %o", error);
//         this.importing = false;
//         if (error.status === 404) {
//             this.importError = error;
//         } else {
//             this.error(error);
//         }
//     });
// }

  return (
    <React.Fragment>
      <PageSection variant={PageSectionVariants.light} className="app-page-section-breadcrumb">
        <Breadcrumb>
          <BreadcrumbItem to="/">
            APIs
          </BreadcrumbItem>
          <BreadcrumbItem isActive>
            Import API
          </BreadcrumbItem>
        </Breadcrumb>
      </PageSection>
      <PageSection variant={PageSectionVariants.light}>
        <Title headingLevel="h1" size="3xl">
          Import an existing API
        </Title>
      </PageSection>
      <PageSection>
        <Split className="app-import-api-split-layout">
          <SplitItem>
            <Form>
              <p className="app-form-helper-text">Fields marked with <span className="app-form-helper-text-asterisk">*</span> are required.</p>
              <FormGroup
                label="Import Type"
                isRequired
                fieldId="import-type"
              >
                <FormSelect
                    value={importType}
                    onChange={onSelectChange}
                    id="import-type"
                    name="import-type"
                  >
                  {options.map((option, index) => (
                    <FormSelectOption
                      isDisabled={option.disabled}
                      key={index}
                      value={option.value}
                      label={option.label}
                    />
                  ))}
                </FormSelect>
              </FormGroup>
              { importType === options[0].value && (
                <FormGroup
                  label="URL"
                  isRequired
                  fieldId="import-url"
                  helperTextInvalid={helperTextInvalid1}
                  isValid={isValidTextInput1}
                >
                <TextInput
                  isRequired
                  type="text"
                  id="import-url"
                  name="import-url"
                  value={textInputUrl1}
                  onChange={handleTextInputChange1}
                  placeholder="https://gist.githubusercontent.com/Tim/94445d/raw/5dba00/oai-import.json"
                />
              </FormGroup>
              )}
              { importType === options[1].value && (
                <FormGroup
                  label="Source Control"
                  isRequired
                  fieldId="import-url-source-control"
                  helperTextInvalid={helperTextInvalid2}
                  isValid={isValidTextInput2}
                >
                <TextInput
                  isRequired
                  type="text"
                  id="import-url-source-control"
                  name="import-url-source-control"
                  value={textInputUrl2}
                  onChange={handleTextInputChange2}
                  placeholder="https://github.com/ORG/REPO/blob/master/path/to/open-api-doc.json"
                />
              </FormGroup>
              )}
              { importType === options[2].value && (
                <FormGroup
                  label="Clipboard"
                  isRequired
                  fieldId="import-clipboard"
                >
                {/* <TextInput
                  isRequired
                  type="text"
                  id="import-clipboard"
                  name="import-clipboard"
                  value={textInputClipboard}
                  onChange={handleTextInputChange3}
                /> */}
                <MonacoEditor
                  width="800"
                  height="600"
                  language="javascript"
                  theme="vs-dark"
                  value={textInputClipboard}
                  options={monacoOptions}
                  onChange={monacoOnChange}
                  editorDidMount={editorDidMount}
                />
              </FormGroup>
              )}
              <ActionGroup>
                <Button type="submit" variant="primary" onClick={handleSubmit}>Import API</Button>
              </ActionGroup>
            </Form>
          </SplitItem>
          <SplitItem>
            <Card className="app__card-import-api">
              <CardBody>
                <TextContent>
                  <Text component={TextVariants.h6}>
                    What is this page?
                  </Text>

                  Hey there! Here you can import an existing API to the Studio by either 
                  giving us the OpenAPI document or telling us where we can get it.

                  <Text component={TextVariants.h6}>
                    Choose from the following options:
                  </Text>
                  <TextList>
                    <TextListItem>
                      Import from source control URL
                    </TextListItem>
                    <TextListItem>
                      Import raw content from URL
                    </TextListItem>
                    <TextListItem>
                      Copy and paste raw content directly
                    </TextListItem>
                  </TextList>
                </TextContent>
              </CardBody>
            </Card>
          </SplitItem>
        </Split>
      </PageSection>
    </React.Fragment>
  );
}
