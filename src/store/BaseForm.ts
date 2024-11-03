import {StoreBanquetRequest, UpdateBanquetRequest} from "@/openapi";

export default class BaseForm <T extends object = object> {
  /** Resource that was used to populate the form. */
  protected resource: T | null;

  /** Properties that were set to the form. */
  protected properties: Partial<T>;

  /** Changes that were made to the form's properties. */
  protected changes: Partial<T>;

  /**
   * BaseForm's constructor.
   *
   * @param resource
   */
  constructor(resource: T = {} as T) {
    this.resource = resource;
    this.properties = {} as T;
    this.changes = {} as Partial<T>;

    this.populate(resource);
  }

  /**
   * Dynamically populate properties from the given data object.
   *
   * @param data
   */
  public populate(data: Partial<T> = {}) {
    for (const [key, value] of Object.entries(data)) {
      this.properties[key] = value;
    }
  }

  /**
   * Dynamically repopulate properties from the given data object.
   * Sets `properties` to an empty object before setting new values.
   *
   * @param data
   *
   * @return void
   */
  public repopulate(data: Partial<T> = {}): void {
    this.properties = {} as T;
    this.populate(data);
  }

  /**
   * Returns all the form's properties.
   *
   * @return object
   */
  public getProperties(): Partial<T> {
    return this.properties;
  }

  /**
   * Returns all the form's properties.
   *
   * @param name Name of the property to retrieve.
   * @param defaultValue
   *
   * @return The value of the property, or undefined if it does not exist.
   */
  public getProperty<K extends keyof T>(name: K, defaultValue: undefined): T[K] | undefined  {
    if (Object.prototype.hasOwnProperty.call(this.changes, name)) {
      return this.changes[name];
    }

    return defaultValue;
  }

  /**
   * Sets property on the form.
   *
   * @return object
   */
  public setProperty<K extends keyof T>(name: K, value: any, silent = false): void {
    if (silent === false && this.differs(name, value)) {
      this.setChange(name, value);
    }

    this.properties[name] = value;
  }

  /**
   * Removes property from the form.
   *
   * @param name
   *
   * @return boolean
   */
  public unsetProperty<K extends keyof T>(name: K): boolean {
    this.unsetChange(name);
    return delete this.properties[name];
  }

  /**
   * Removes all the properties.
   *
   * @return void
   */
  public clearProperties(): void {
    this.properties = {} as T;
  }

  /**
   * Determines if property's value differs from the given value.
   *
   * @param name Name of the property
   * @param value Value to be compared against
   *
   * @return boolean
   */
  public differs<K extends keyof T>(name: K, value: unknown): boolean {
    return this.properties[name] !== value;
  }

  /**
   * Returns all the form's properties that were changed.
   *
   * @return object
   */
  public getChanges(): Partial<T> {
    return this.changes;
  }

  /**
   * Returns all property's changed value.
   *
   * @param name
   * @param defaultValue
   *
   * @return any
   */
  public getChange<K extends keyof T>(name: K, defaultValue = undefined): unknown {
    if (Object.prototype.hasOwnProperty.call(this.changes, name)) {
      return this.changes[name];
    }

    return defaultValue;
  }

  /**
   * Records that the property was changed (and it's new value).
   *
   * @param name
   * @param value
   *
   * @return void
   */
  public setChange<K extends keyof T>(name: K, value: any): void {
    this.changes[name] = value;
  }

  /**
   * Removes the record about property being changed.
   *
   * @param name
   *
   * @return boolean
   */
  public unsetChange<K extends keyof T>(name: K): boolean {
    return delete this.changes[name];
  }

  /**
   * Removes all the records about properties being changed.
   *
   * @return void
   */
  public clearChanges(): void {
    this.changes = {};
  }

  /**
   * Determines if there is at least one record about
   * properties being changed.
   *
   * @return boolean
   */
  public hasChanges(): boolean {
    return Object.keys(this.getChanges()).length > 0;
  }

  /**
   * Determines if there is at least one record about
   * properties being changed and at the same time the
   * resource property's value differs from the new one.
   *
   * @return boolean
   */
  public hasRealChanges(): boolean {
    if (!this.resource) {
      return this.hasChanges();
    }

    let result = false;

    Object.keys(this.getChanges())
      .forEach(name => {
        if (this.resource[name] !== this.getChange(name as keyof T)) {
          result = true;
          return;
        }
      });

    return result;
  }

  /**
   * Transforms the form into a `store` request.
   *
   * @return object
   */
  public asCreate(): object {
    return this.getProperties();
  }

  /**
   * Transforms the form into an `update` request.
   *
   * @return object
   */
  public asUpdate(): object {
    return this.asCreate();
  }
}
