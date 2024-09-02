import { IInputs, IOutputs } from "./generated/ManifestTypes";

//Custom Type
type OptionsType =
  | { label: string; value: string; parentEntityId: string }[]
  | null;

export class MultiSelectCheckBoxList
  implements ComponentFramework.StandardControl<IInputs, IOutputs>
{
  private _notifyOutputChanged: () => void;
  //
  private selectedOptions: OptionsType;
  private initialValues: OptionsType;

  private _container: HTMLDivElement;
  private _context: ComponentFramework.Context<IInputs>;
  private _refreshData: EventListenerOrEventListenerObject;
  //
  private _col_md_4_div: HTMLDivElement;
  private _wrapper_div: HTMLDivElement;
  private _button: HTMLButtonElement;
  private _checkboxes_div: HTMLDivElement;
  private _inner_wrapper_div: HTMLDivElement;

  private labelElement: HTMLLabelElement;
  private inputElement: HTMLInputElement;
  private spanElement: HTMLSpanElement;

  private _fieldset = HTMLFieldSetElement;
  private _br = HTMLBRElement;
  private _lbl = HTMLLIElement;
  private _details = HTMLDetailsElement;
  private _ul = HTMLUListElement;
  private _li = HTMLLIElement;

  notifyChange(value: OptionsType) {
    this.selectedOptions = value;
    this._notifyOutputChanged;
  }

  /**
   * Empty constructor.
   */
  constructor() {}

  /**
   * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
   * Data-set values are not initialized here, use updateView.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
   * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
   * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
   * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
   */
  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary,
    container: HTMLDivElement
  ): void {
    // Add control initialization code
    this._context = context;
    this._container = document.createElement("div");
    this._notifyOutputChanged = notifyOutputChanged;

    let preValue: OptionsType = null;
    preValue = this.Retrieve(
      context,
      context.parameters.primaryEntityName.raw!,
      context.parameters.primaryEntityId.raw!,
      context.parameters.primaryEntityIdColumn.raw!,
      context.parameters.primaryEntityNameColumn.raw!
    );
    let _innerHtml: string = "";

    _innerHtml = '<ul class="list-items"> ';
    if (preValue != null) {
      for (let j = 0; j < preValue.length; j++) {
        if (
          preValue[j].label != null &&
          preValue[j].value != null &&
          preValue[j].parentEntityId != null
        ) {
          _innerHtml =
            _innerHtml +
            '<li class="item" data-value="' +
            preValue[j].value +
            '" data-label="' +
            preValue[j].label +
            '" data-parentEntityId="' +
            preValue[j].parentEntityId +
            '">' +
            '<span class="checkbox"> <i class="fa-solid fa-check check-icon"></i> </span> ' +
            '<span class="item-text">' +
            preValue[j].label +
            "</span></li>";
        }
      }
    }
    _innerHtml = _innerHtml + "</ul>";
    /* '<ul class="list-items"> '
           <li class="item checked" data-value="123" data-label="123" data-parentEntityId="1234">  
          <span class="checkbox"> <i class="fa-solid fa-check check-icon"></i> </span> 
          <span class="item-text">French</span></li>  
        </ul>';
    */
    //Generate HTML

    this._container.innerHTML =
      '<div class="select-btn"> <span class="btn-text">' +
      (context.parameters.fieldPlaceHolder.raw! == ""
        ? "Select Options"
        : context.parameters.fieldPlaceHolder.raw!) +
      '</span> <span class="arrow-dwn"><i class="fa-solid fa-chevron-down"></i>  </span>   </div>' +
      _innerHtml;

    //this._refreshData = this.refreshData.bind(this);
    /*
    this._col_md_4_div = document.createElement("div");
    this._col_md_4_div.setAttribute("class", "col-md-4");

    this._wrapper_div = document.createElement("div");
    this._wrapper_div.setAttribute("class", "wrapper");

    this._button = document.createElement("button");
    this._button.setAttribute("class", "form-control toggle-next ellipsis");
    this._button.innerText = "Connection Roles";

    this._checkboxes_div = document.createElement("div");
    this._checkboxes_div.setAttribute("id", "roles");
    this._checkboxes_div.setAttribute("class", "checkboxes");
    this._checkboxes_div.setAttribute("style", "display: block;");

    this._inner_wrapper_div = document.createElement("div");
    this._inner_wrapper_div.setAttribute("class", "inner-wrap");
  */
    // appending the HTML elements to the control's HTML container element.
    /*this._container.appendChild(this._col_md_4_div);    
    this._col_md_4_div.appendChild(this._wrapper_div);
    this._wrapper_div.appendChild(this._button);
    this._wrapper_div.appendChild(this._checkboxes_div);
    this._checkboxes_div.appendChild(this._inner_wrapper_div);
    //
    */
    container.appendChild(this._container);

    //JS Code
    const selectBtn = document.querySelector(".select-btn"),
      items = document.querySelectorAll(".item");
    if (selectBtn != null && selectBtn != undefined) {
      selectBtn.addEventListener("click", () => {
        selectBtn.classList.toggle("open");
      });
    }
    items.forEach((item) => {
      item.addEventListener("click", () => {
        item.classList.toggle("checked");

        const checked = document.querySelectorAll(".checked");
        const btnText = document.querySelector(".btn-text");

        if (btnText != null && btnText != undefined) {
          if (checked && checked.length > 0) {
            btnText.innerHTML = `${checked.length} Selected`; //innerText

            let optionArray: OptionsType;
            optionArray = null; //To handle : 'optionArray' is never reassigned. Use 'const' instead
            optionArray = [];

            const childNodesArr = Array.prototype.slice.call(checked);
            for (let i = 0; i < childNodesArr.length; i++) {
              if (
                childNodesArr[i].getAttribute("data-value") != undefined &&
                childNodesArr[i].getAttribute("data-value") != null &&
                childNodesArr[i].getAttribute("data-label") != undefined &&
                childNodesArr[i].getAttribute("data-label") != null &&
                childNodesArr[i].getAttribute("data-parentEntityId") !=
                  undefined &&
                childNodesArr[i].getAttribute("data-parentEntityId") != null
              ) {
                console.log(childNodesArr[i].getAttribute("data-label"));
                console.log(childNodesArr[i].getAttribute("data-value"));
                console.log(
                  childNodesArr[i].getAttribute("data-parentEntityId")
                );

                optionArray.push({
                  label: childNodesArr[i].getAttribute("data-label"),
                  value: childNodesArr[i].getAttribute("data-value"),
                  parentEntityId: childNodesArr[i].getAttribute(
                    "data-parentEntityId"
                  ),
                });
              }
            }
            if (optionArray.length == 0) {
              //Each time call on-change
              this.notifyChange([]);
              this.selectedOptions = [];
              this._notifyOutputChanged();
            } else {
              this.notifyChange(optionArray);
              this.selectedOptions = optionArray;
              this._notifyOutputChanged();
            }
          } else {
            //btnText.innerHTML = "Select Roles"; //innerText
            //alert("no item selected");
          }
        }
      });
    });
  }

  /**
   * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
   */
  public updateView(context: ComponentFramework.Context<IInputs>): void {
    // Add code to update control view
  }

  /**
   * It is called by the framework prior to a control receiving new data.
   * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as "bound" or "output"
   */
  public getOutputs(): IOutputs {
    return {};
  }

  /**
   * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
   * i.e. cancelling any pending remote calls, removing listeners, etc.
   */
  public destroy(): void {
    // Add code to cleanup control if necessary
  }

  //Custom Methods
  private Retrieve(
    context: ComponentFramework.Context<IInputs>,
    primaryEntityName: string,
    primaryEntityId: string,
    primaryEntityIdColumn: string,
    primaryEntityNameColumn: string
  ): OptionsType {
    //
    let outArray: OptionsType;
    outArray = null; //To handle : 'outArray' is never reassigned. Use 'const' instead
    outArray = [];
    context.webAPI
      .retrieveMultipleRecords(
        primaryEntityName,
        "?$select=" +
          primaryEntityIdColumn +
          "," +
          primaryEntityNameColumn +
          "&$filter=" +
          primaryEntityIdColumn +
          " eq " +
          primaryEntityId
      ) //
      .then(
        function success(results) {
          console.log(results);
          if (results.entities.length > 0) {
            outArray = [];
            for (let i = 0; i < results.entities.length; i++) {
              outArray.push({
                label: results.entities[0][primaryEntityNameColumn].toString(),
                value: results.entities[0][primaryEntityIdColumn].toString(),
                parentEntityId: primaryEntityId,
              });
            }
          }
          return outArray;
        },
        function (error) {
          outArray = [];
          console.log(error.message);
          /*
          outArray.push({
            value: "1234",
            label: "Option 2",
            parentEntityId: "",
          });
          */
        }
      );
    return outArray;
  }
}
