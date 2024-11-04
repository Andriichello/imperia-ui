import BaseForm from "@/store/BaseForm";
import {ResponseErrors} from "@/helpers";

export default class CrudState <
  T extends object = object,
  F extends BaseForm<T> = BaseForm<T>,
  I = Response,
  S = Response,
  C = Response,
  U = Response,
  D = Response,
> {
  /** Resource form that is currently used. */
  public form: F | null;

  /** Resource that is currently selected. */
  public selected: T | null;

  /** Resource that was retrieved in a last show request. */
  public resource: T | null;

  /** Resources that was retrieved in a last index request. */
  public resources: T[] | null;

  /** Last index response. */
  public index: I | Response | ResponseErrors | null;

  /** Last index more response. */
  public indexMore: I | Response | ResponseErrors | null;

  /** Last show response. */
  public show: S | Response | ResponseErrors | null;

  /** Last store response. */
  public store: C | Response | ResponseErrors | null;

  /** Last update response. */
  public update: U | Response | ResponseErrors | null;

  /** Last delete response. */
  public destroy: D | Response| ResponseErrors | null;

  /** Is `true` if currently waiting for index response.  */
  public isLoadingIndex: boolean;

  /** Is `true` if currently waiting for index more response.  */
  public isLoadingIndexMore: boolean;

  /** Is `true` if currently waiting for show response.  */
  public isLoadingShow: boolean;

  /** Is `true` if currently waiting for store response.  */
  public isLoadingStore: boolean;

  /** Is `true` if currently waiting for update response.  */
  public isLoadingUpdate: boolean;

  /** Is `true` if currently waiting for destroy response.  */
  public isLoadingDestroy: boolean;

  /**
   * CrudState's constructor.
   *
   * @param FormClass
   */
  constructor(FormClass: new () => F) {
    this.selected = null;
    this.form = new FormClass();

    this.index = null;
    this.indexMore = null;
    this.show = null;
    this.store = null;
    this.update = null;
    this.destroy = null;

    this.isLoadingIndex = false;
    this.isLoadingIndexMore = false;
    this.isLoadingShow = false;
    this.isLoadingStore = false;
    this.isLoadingUpdate = false;
    this.isLoadingDestroy = false;
  }
}
