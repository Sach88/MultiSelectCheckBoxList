import { IInputs, IOutputs } from "./generated/ManifestTypes";

//Custom Type
type OptionsType = { label: string; value: string }[] | null;

export class MultiSelectCheckBoxList
  implements ComponentFramework.StandardControl<IInputs, IOutputs>
{
  private _notifyOutputChanged: () => void;
  //
  private selectedOptions: OptionsType; //Used inside notifyOutput Change

  private _container: HTMLDivElement;
  private _context: ComponentFramework.Context<IInputs>;

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
  public async init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary,
    container: HTMLDivElement
  ): Promise<void> {
    this._notifyOutputChanged = notifyOutputChanged;
    // Add control initialization code
    this._context = context;
    this._container = document.createElement("div");

    //Get Previously stored JSON (i.e. Options)
    let _previousOptions: OptionsType = [];
    let _previousOptionsRaw: string = "";
    _previousOptionsRaw = context.parameters.multiSelectJsonValues.raw!; //Bound == Two Way
    if (
      _previousOptionsRaw != null &&
      _previousOptionsRaw != "" &&
      _previousOptionsRaw != undefined
    ) {
      _previousOptions = JSON.parse(_previousOptionsRaw) as OptionsType;
    }
    //Fetch available options.
    let availableOptions: OptionsType = null;
    availableOptions = await this.Retrieve(
      context,
      context.parameters.relatedEntityName.raw!,
      context.parameters.relatedEntityIdColumn.raw!,
      context.parameters.relatedEntityNameColumn.raw!,
      context.parameters.relatedEntitySearchColumn1.raw!,
      _previousOptions
    );

    let _innerHtml: string = "";
    _innerHtml = '<ul class="list-items"> ';

    if (_previousOptions != null) {
      _innerHtml = _innerHtml + this.getPreInnerHtml(_previousOptions);
    }
    if (availableOptions != null) {
      _innerHtml = _innerHtml + this.getAvailInnerHtml(availableOptions);
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
      '<div class="select-btn"> <span style="font-size:14px" class="btn-text">' +
      (context.parameters.OptionsPlaceHolder.raw! == ""
        ? "Select Option(s)"
        : context.parameters.OptionsPlaceHolder.raw!) +
      '</span> <span class="arrow-dwn"><i class="fa-solid fa-chevron-down"></i>  </span>   </div>' +
      _innerHtml;
    //append to parent container
    container.appendChild(this._container);

    /* IMP CODE */
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
            btnText.innerHTML = `${checked.length} Roles Selected`; //innerText

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
    return {
      //This methods gets called on notifyOutputChange
      multiSelectJsonValues: JSON.stringify(this.selectedOptions),
    };
  }

  /**
   * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
   * i.e. cancelling any pending remote calls, removing listeners, etc.
   */
  public destroy(): void {
    // Add code to cleanup control if necessary
  }

  //Custom Methods
  private getPreInnerHtml(preValue: OptionsType): string {
    let _innerHtml: string = "";
    if (preValue != null) {
      for (let j = 0; j < preValue.length; j++) {
        if (preValue[j].label != null && preValue[j].value != null) {
          _innerHtml =
            _innerHtml +
            '<li class="item checked" data-value="' +
            preValue[j].value +
            '" data-label="' +
            preValue[j].label +
            '" data-parentEntityId="">' +
            '<span class="checkbox"> <i class="fa-solid fa-check check-icon"></i> </span> ' +
            '<span class="item-text">' +
            preValue[j].label +
            "</span></li>";
        }
      }
    }
    return _innerHtml;
  }
  private getAvailInnerHtml(preValue: OptionsType): string {
    let _innerHtml: string = "";
    if (preValue != null) {
      for (let j = 0; j < preValue.length; j++) {
        if (preValue[j].label != null && preValue[j].value != null) {
          _innerHtml =
            _innerHtml +
            '<li class="item" data-value="' +
            preValue[j].value +
            '" data-label="' +
            preValue[j].label +
            '" data-parentEntityId="">' +
            '<span class="checkbox"> <i class="fa-solid fa-check check-icon"></i> </span> ' +
            '<span class="item-text">' +
            preValue[j].label +
            "</span></li>";
        }
      }
    }
    return _innerHtml;
  }

  private async Retrieve(
    context: ComponentFramework.Context<IInputs>,
    relatedEntityName: string,
    relatedEntityIdColumn: string,
    relatedEntityNameColumn: string,
    relatedEntitySearchColumn1: string,
    previousOptions: OptionsType
  ): Promise<OptionsType> {
    //
    let outArray: OptionsType;
    outArray = null; //To handle : 'outArray' is never reassigned. Use 'const' instead
    outArray = [];
    await context.webAPI
      .retrieveMultipleRecords(
        relatedEntityName,
        "?$select=" +
          relatedEntityIdColumn +
          "," +
          relatedEntityNameColumn +
          "&$filter=" +
          relatedEntitySearchColumn1 +
          " ne null" +
          "&$orderby=" +
          relatedEntityNameColumn +
          " asc"
      ) //
      .then(
        function success(results) {
          console.log(results);
          if (results.entities.length > 0) {
            outArray = [];
            for (let i = 0; i < results.entities.length; i++) {
              let isPrevious: boolean = false;
              if (previousOptions != null) {
                for (let j = 0; j < previousOptions.length; j++) {
                  if (
                    results.entities[i][relatedEntityIdColumn].toString() ==
                    previousOptions[j].value
                  ) {
                    isPrevious = true;
                  } else {
                    isPrevious = false;
                  }
                }
              }
              if (isPrevious != true) {
                outArray.push({
                  label:
                    results.entities[i][relatedEntityNameColumn].toString(),
                  value: results.entities[i][relatedEntityIdColumn].toString(),
                });
              }
            }
          }
        },
        function (error) {
          console.log(error.message);
        }
      );
    return outArray;
  }
}
