/*
*This is auto generated from the ControlManifest.Input.xml file
*/

// Define IInputs and IOutputs Type. They should match with ControlManifest.
export interface IInputs {
    multiSelectJsonValues: ComponentFramework.PropertyTypes.StringProperty;
    relatedEntityName: ComponentFramework.PropertyTypes.StringProperty;
    relatedEntityIdColumn: ComponentFramework.PropertyTypes.StringProperty;
    relatedEntityNameColumn: ComponentFramework.PropertyTypes.StringProperty;
    relatedEntitySearchColumn1: ComponentFramework.PropertyTypes.StringProperty;
    OptionsPlaceHolder: ComponentFramework.PropertyTypes.StringProperty;
}
export interface IOutputs {
    multiSelectJsonValues?: string;
}
