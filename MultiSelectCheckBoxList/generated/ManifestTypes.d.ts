/*
*This is auto generated from the ControlManifest.Input.xml file
*/

// Define IInputs and IOutputs Type. They should match with ControlManifest.
export interface IInputs {
    multiSelectedValues: ComponentFramework.PropertyTypes.StringProperty;
    primaryEntityName: ComponentFramework.PropertyTypes.StringProperty;
    primaryEntityId: ComponentFramework.PropertyTypes.StringProperty;
    primaryEntityIdColumn: ComponentFramework.PropertyTypes.StringProperty;
    primaryEntityNameColumn: ComponentFramework.PropertyTypes.StringProperty;
    fieldPlaceHolder: ComponentFramework.PropertyTypes.StringProperty;
}
export interface IOutputs {
    multiSelectedValues?: string;
}
