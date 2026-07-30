import * as $protobuf from "protobufjs";
import Long = require("long");

/** DomainType enum. */
export enum DomainType {

    /** ANOVA_DOMAIN_ID_CONFIG value */
    ANOVA_DOMAIN_ID_CONFIG = 0,

    /** ANOVA_DOMAIN_ID_BULK_TRANSFER value */
    ANOVA_DOMAIN_ID_BULK_TRANSFER = 1,

    /** ANOVA_DOMAIN_ID_COUNT value */
    ANOVA_DOMAIN_ID_COUNT = 2
}

/** BulkDomainMessageType enum. */
export enum BulkDomainMessageType {

    /** MSG_TYPE_PAGE_GET value */
    MSG_TYPE_PAGE_GET = 0,

    /** MSG_TYPE_PAGE_PUT value */
    MSG_TYPE_PAGE_PUT = 1,

    /** MSG_TYPE_FILE_ERASE value */
    MSG_TYPE_FILE_ERASE = 2,

    /** MSG_TYPE_FILE_PROPS value */
    MSG_TYPE_FILE_PROPS = 3,

    /** MSG_TYPE_SYSTEM_RESET value */
    MSG_TYPE_SYSTEM_RESET = 4,

    /** MSG_TYPE_COUNT value */
    MSG_TYPE_COUNT = 5
}

/** UnitType enum. */
export enum UnitType {

    /** DEGREES_POINT_1C value */
    DEGREES_POINT_1C = 0,

    /** DEGREES_POINT_1F value */
    DEGREES_POINT_1F = 1,

    /** MOTOR_SPEED value */
    MOTOR_SPEED = 2,

    /** BOOLEAN value */
    BOOLEAN = 3,

    /** DEGREES_POINT_01C value */
    DEGREES_POINT_01C = 4,

    /** DEGREES_POINT_01F value */
    DEGREES_POINT_01F = 5,

    /** DEGREES_C value */
    DEGREES_C = 6,

    /** DEGREES_F value */
    DEGREES_F = 7
}

/** MessageError enum. */
export enum MessageError {

    /** MSG_ERR_NONE value */
    MSG_ERR_NONE = 0,

    /** MSG_ERR_FAILED value */
    MSG_ERR_FAILED = 1,

    /** MSG_ERR_RESOURCE_IN_USE value */
    MSG_ERR_RESOURCE_IN_USE = 2,

    /** MSG_ERR_RX_OVERRUN value */
    MSG_ERR_RX_OVERRUN = 3,

    /** MSG_ERR_TX_OVERRUN value */
    MSG_ERR_TX_OVERRUN = 4,

    /** MSG_ERR_UNKNOWN_COMMAND value */
    MSG_ERR_UNKNOWN_COMMAND = 5,

    /** MSG_ERR_LENGTH value */
    MSG_ERR_LENGTH = 6,

    /** MSG_ERR_RESOURCE_INVALID value */
    MSG_ERR_RESOURCE_INVALID = 7,

    /** MSG_ERR_OP_UNSUPPORTED value */
    MSG_ERR_OP_UNSUPPORTED = 8
}

/** ConfigDomainMessageType enum. */
export enum ConfigDomainMessageType {

    /** LOOPBACK value */
    LOOPBACK = 0,

    /** CLI_TEXT value */
    CLI_TEXT = 1,

    /** SAY_HELLO value */
    SAY_HELLO = 2,

    /** SET_TEMP_SETPOINT value */
    SET_TEMP_SETPOINT = 3,

    /** GET_TEMP_SETPOINT value */
    GET_TEMP_SETPOINT = 4,

    /** GET_SENSORS value */
    GET_SENSORS = 5,

    /** SET_TEMP_UNITS value */
    SET_TEMP_UNITS = 6,

    /** GET_TEMP_UNITS value */
    GET_TEMP_UNITS = 7,

    /** SET_COOKING_POWER_LEVEL value */
    SET_COOKING_POWER_LEVEL = 8,

    /** GET_COOKING_POWER_LEVEL value */
    GET_COOKING_POWER_LEVEL = 9,

    /** START_COOKING value */
    START_COOKING = 10,

    /** STOP_COOKING value */
    STOP_COOKING = 11,

    /** SET_SOUND_LEVEL value */
    SET_SOUND_LEVEL = 12,

    /** GET_SOUND_LEVEL value */
    GET_SOUND_LEVEL = 13,

    /** SET_DISPLAY_BRIGHTNESS value */
    SET_DISPLAY_BRIGHTNESS = 14,

    /** GET_DISPLAY_BRIGHTNESS value */
    GET_DISPLAY_BRIGHTNESS = 15,

    /** SET_COOKING_TIMER value */
    SET_COOKING_TIMER = 16,

    /** STOP_COOKING_TIMER value */
    STOP_COOKING_TIMER = 17,

    /** GET_COOKING_TIMER value */
    GET_COOKING_TIMER = 18,

    /** CANCEL_COOKING_TIMER value */
    CANCEL_COOKING_TIMER = 19,

    /** SET_CHANGE_POINT value */
    SET_CHANGE_POINT = 20,

    /** CHANGE_POINT value */
    CHANGE_POINT = 22,

    /** SET_BLE_PARAMS value */
    SET_BLE_PARAMS = 23,

    /** BLE_PARAMS value */
    BLE_PARAMS = 24,

    /** GET_DEVICE_INFO value */
    GET_DEVICE_INFO = 25,

    /** GET_FIRMWARE_INFO value */
    GET_FIRMWARE_INFO = 26,

    /** SYSTEM_ALERT_VECTOR value */
    SYSTEM_ALERT_VECTOR = 27,

    /** RESERVED28 value */
    RESERVED28 = 28,

    /** MESSAGE_SPOOF value */
    MESSAGE_SPOOF = 29
}

/** TransferStatusError enum. */
export enum TransferStatusError {

    /** TR_STATUS_OK value */
    TR_STATUS_OK = 0,

    /** TR_STATUS_PAGE_INVALID value */
    TR_STATUS_PAGE_INVALID = 1,

    /** TR_STATUS_PAGE_IN_USE value */
    TR_STATUS_PAGE_IN_USE = 2,

    /** TR_STATUS_PAGE_CORRUPT value */
    TR_STATUS_PAGE_CORRUPT = 3,

    /** TR_STATUS_INVALID_FILE_HANDLE value */
    TR_STATUS_INVALID_FILE_HANDLE = 4,

    /** TR_STATUS_FAILED value */
    TR_STATUS_FAILED = 5
}

/** FileHandleType enum. */
export enum FileHandleType {

    /** FILE_HANDLE_PSUDO value */
    FILE_HANDLE_PSUDO = 0,

    /** FILE_HANDLE_LOG value */
    FILE_HANDLE_LOG = 1,

    /** FILE_HANDLE_OTA value */
    FILE_HANDLE_OTA = 2
}

/**
 * Properties of an IntegerValue.
 * @deprecated Use IntegerValue.$Properties instead.
 */
export interface IIntegerValue extends IntegerValue.$Properties {
}

/** Represents an IntegerValue. */
export class IntegerValue {

    /**
     * Constructs a new IntegerValue.
     * @param [properties] Properties to set
     */
    constructor(properties?: IntegerValue.$Properties);

    /** Unknown fields preserved while decoding when enabled */
    $unknowns?: Uint8Array[];

    /** IntegerValue value. */
    value: number;

    /**
     * Creates a new IntegerValue instance using the specified properties.
     * @param [properties] Properties to set
     * @returns IntegerValue instance
     */
    static create(properties: IntegerValue.$Shape): IntegerValue & IntegerValue.$Shape;
    static create(properties?: IntegerValue.$Properties): IntegerValue;

    /**
     * Encodes the specified IntegerValue message. Does not implicitly {@link IntegerValue.verify|verify} messages.
     * @param message IntegerValue message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encode(message: IntegerValue.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified IntegerValue message, length delimited. Does not implicitly {@link IntegerValue.verify|verify} messages.
     * @param message IntegerValue message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encodeDelimited(message: IntegerValue.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an IntegerValue message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns {IntegerValue & IntegerValue.$Shape} IntegerValue
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): IntegerValue & IntegerValue.$Shape;

    /**
     * Decodes an IntegerValue message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns {IntegerValue & IntegerValue.$Shape} IntegerValue
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): IntegerValue & IntegerValue.$Shape;

    /**
     * Verifies an IntegerValue message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an IntegerValue message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns IntegerValue
     */
    static fromObject(object: { [k: string]: any }): IntegerValue;

    /**
     * Creates a plain object from an IntegerValue message. Also converts values to other types if specified.
     * @param message IntegerValue
     * @param [options] Conversion options
     * @returns Plain object
     */
    static toObject(message: IntegerValue, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this IntegerValue to JSON.
     * @returns JSON object
     */
    toJSON(): { [k: string]: any };

    /**
     * Gets the type url for IntegerValue
     * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
     * @returns The type url
     */
    static getTypeUrl(prefix?: string): string;
}

export namespace IntegerValue {

    /** Properties of an IntegerValue. */
    interface $Properties {

        /** IntegerValue value */
        value: number;

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];
    }

    /** Shape of an IntegerValue. */
    type $Shape = IntegerValue.$Properties;
}

/**
 * Properties of a SensorValue.
 * @deprecated Use SensorValue.$Properties instead.
 */
export interface ISensorValue extends SensorValue.$Properties {
}

/** Represents a SensorValue. */
export class SensorValue {

    /**
     * Constructs a new SensorValue.
     * @param [properties] Properties to set
     */
    constructor(properties?: SensorValue.$Properties);

    /** Unknown fields preserved while decoding when enabled */
    $unknowns?: Uint8Array[];

    /** SensorValue value. */
    value: number;

    /** SensorValue units. */
    units: UnitType;

    /** SensorValue sensorType. */
    sensorType: SensorValue.SensorType;

    /**
     * Creates a new SensorValue instance using the specified properties.
     * @param [properties] Properties to set
     * @returns SensorValue instance
     */
    static create(properties: SensorValue.$Shape): SensorValue & SensorValue.$Shape;
    static create(properties?: SensorValue.$Properties): SensorValue;

    /**
     * Encodes the specified SensorValue message. Does not implicitly {@link SensorValue.verify|verify} messages.
     * @param message SensorValue message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encode(message: SensorValue.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified SensorValue message, length delimited. Does not implicitly {@link SensorValue.verify|verify} messages.
     * @param message SensorValue message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encodeDelimited(message: SensorValue.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a SensorValue message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns {SensorValue & SensorValue.$Shape} SensorValue
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SensorValue & SensorValue.$Shape;

    /**
     * Decodes a SensorValue message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns {SensorValue & SensorValue.$Shape} SensorValue
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SensorValue & SensorValue.$Shape;

    /**
     * Verifies a SensorValue message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a SensorValue message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns SensorValue
     */
    static fromObject(object: { [k: string]: any }): SensorValue;

    /**
     * Creates a plain object from a SensorValue message. Also converts values to other types if specified.
     * @param message SensorValue
     * @param [options] Conversion options
     * @returns Plain object
     */
    static toObject(message: SensorValue, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this SensorValue to JSON.
     * @returns JSON object
     */
    toJSON(): { [k: string]: any };

    /**
     * Gets the type url for SensorValue
     * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
     * @returns The type url
     */
    static getTypeUrl(prefix?: string): string;
}

export namespace SensorValue {

    /** Properties of a SensorValue. */
    interface $Properties {

        /** SensorValue value */
        value: number;

        /** SensorValue units */
        units: UnitType;

        /** SensorValue sensorType */
        sensorType: SensorValue.SensorType;

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];
    }

    /** Shape of a SensorValue. */
    type $Shape = SensorValue.$Properties;

    /** SensorType enum. */
    enum SensorType {

        /** WaterTemp value */
        WaterTemp = 0,

        /** HeaterTemp value */
        HeaterTemp = 1,

        /** TriacTemp value */
        TriacTemp = 2,

        /** UnusedTemp value */
        UnusedTemp = 3,

        /** InternalTemp value */
        InternalTemp = 4,

        /** WaterLow value */
        WaterLow = 5,

        /** WaterLeak value */
        WaterLeak = 6,

        /** MotorSpeed value */
        MotorSpeed = 7
    }
}

/**
 * Properties of a SensorValueList.
 * @deprecated Use SensorValueList.$Properties instead.
 */
export interface ISensorValueList extends SensorValueList.$Properties {
}

/** Represents a SensorValueList. */
export class SensorValueList {

    /**
     * Constructs a new SensorValueList.
     * @param [properties] Properties to set
     */
    constructor(properties?: SensorValueList.$Properties);

    /** Unknown fields preserved while decoding when enabled */
    $unknowns?: Uint8Array[];

    /** SensorValueList values. */
    values: SensorValue.$Properties[];

    /**
     * Creates a new SensorValueList instance using the specified properties.
     * @param [properties] Properties to set
     * @returns SensorValueList instance
     */
    static create(properties: SensorValueList.$Shape): SensorValueList & SensorValueList.$Shape;
    static create(properties?: SensorValueList.$Properties): SensorValueList;

    /**
     * Encodes the specified SensorValueList message. Does not implicitly {@link SensorValueList.verify|verify} messages.
     * @param message SensorValueList message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encode(message: SensorValueList.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified SensorValueList message, length delimited. Does not implicitly {@link SensorValueList.verify|verify} messages.
     * @param message SensorValueList message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encodeDelimited(message: SensorValueList.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a SensorValueList message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns {SensorValueList & SensorValueList.$Shape} SensorValueList
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SensorValueList & SensorValueList.$Shape;

    /**
     * Decodes a SensorValueList message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns {SensorValueList & SensorValueList.$Shape} SensorValueList
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SensorValueList & SensorValueList.$Shape;

    /**
     * Verifies a SensorValueList message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a SensorValueList message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns SensorValueList
     */
    static fromObject(object: { [k: string]: any }): SensorValueList;

    /**
     * Creates a plain object from a SensorValueList message. Also converts values to other types if specified.
     * @param message SensorValueList
     * @param [options] Conversion options
     * @returns Plain object
     */
    static toObject(message: SensorValueList, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this SensorValueList to JSON.
     * @returns JSON object
     */
    toJSON(): { [k: string]: any };

    /**
     * Gets the type url for SensorValueList
     * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
     * @returns The type url
     */
    static getTypeUrl(prefix?: string): string;
}

export namespace SensorValueList {

    /** Properties of a SensorValueList. */
    interface $Properties {

        /** SensorValueList values */
        values?: (SensorValue.$Properties[]|null);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];
    }

    /** Shape of a SensorValueList. */
    type $Shape = SensorValueList.$Properties;
}

/**
 * Properties of a SysAlertBitVector.
 * @deprecated Use SysAlertBitVector.$Properties instead.
 */
export interface ISysAlertBitVector extends SysAlertBitVector.$Properties {
}

/** Represents a SysAlertBitVector. */
export class SysAlertBitVector {

    /**
     * Constructs a new SysAlertBitVector.
     * @param [properties] Properties to set
     */
    constructor(properties?: SysAlertBitVector.$Properties);

    /** Unknown fields preserved while decoding when enabled */
    $unknowns?: Uint8Array[];

    /** SysAlertBitVector prevSetVector. */
    prevSetVector: number;

    /** SysAlertBitVector currVector. */
    currVector: number;

    /**
     * Creates a new SysAlertBitVector instance using the specified properties.
     * @param [properties] Properties to set
     * @returns SysAlertBitVector instance
     */
    static create(properties: SysAlertBitVector.$Shape): SysAlertBitVector & SysAlertBitVector.$Shape;
    static create(properties?: SysAlertBitVector.$Properties): SysAlertBitVector;

    /**
     * Encodes the specified SysAlertBitVector message. Does not implicitly {@link SysAlertBitVector.verify|verify} messages.
     * @param message SysAlertBitVector message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encode(message: SysAlertBitVector.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified SysAlertBitVector message, length delimited. Does not implicitly {@link SysAlertBitVector.verify|verify} messages.
     * @param message SysAlertBitVector message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encodeDelimited(message: SysAlertBitVector.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a SysAlertBitVector message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns {SysAlertBitVector & SysAlertBitVector.$Shape} SysAlertBitVector
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SysAlertBitVector & SysAlertBitVector.$Shape;

    /**
     * Decodes a SysAlertBitVector message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns {SysAlertBitVector & SysAlertBitVector.$Shape} SysAlertBitVector
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SysAlertBitVector & SysAlertBitVector.$Shape;

    /**
     * Verifies a SysAlertBitVector message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a SysAlertBitVector message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns SysAlertBitVector
     */
    static fromObject(object: { [k: string]: any }): SysAlertBitVector;

    /**
     * Creates a plain object from a SysAlertBitVector message. Also converts values to other types if specified.
     * @param message SysAlertBitVector
     * @param [options] Conversion options
     * @returns Plain object
     */
    static toObject(message: SysAlertBitVector, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this SysAlertBitVector to JSON.
     * @returns JSON object
     */
    toJSON(): { [k: string]: any };

    /**
     * Gets the type url for SysAlertBitVector
     * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
     * @returns The type url
     */
    static getTypeUrl(prefix?: string): string;
}

export namespace SysAlertBitVector {

    /** Properties of a SysAlertBitVector. */
    interface $Properties {

        /** SysAlertBitVector prevSetVector */
        prevSetVector: number;

        /** SysAlertBitVector currVector */
        currVector: number;

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];
    }

    /** Shape of a SysAlertBitVector. */
    type $Shape = SysAlertBitVector.$Properties;

    /** Flag enum. */
    enum Flag {

        /** RESERVED0 value */
        RESERVED0 = 0,

        /** HEATING_RATE_UPDATED value */
        HEATING_RATE_UPDATED = 1,

        /** COOKING_STARTED value */
        COOKING_STARTED = 2,

        /** SET_POINT_REACHED value */
        SET_POINT_REACHED = 4,

        /** EVENT_LOG_FULL value */
        EVENT_LOG_FULL = 8,

        /** WATER_LEAK value */
        WATER_LEAK = 16,

        /** WATER_LOW value */
        WATER_LOW = 32,

        /** MOTOR_STUCK value */
        MOTOR_STUCK = 64,

        /** HEATER_OVER_TEMP value */
        HEATER_OVER_TEMP = 128,

        /** TRIAC_OVER_TEMP value */
        TRIAC_OVER_TEMP = 256,

        /** COOKING_TIMER_STARTED value */
        COOKING_TIMER_STARTED = 512,

        /** SETPOINT_CHANGED value */
        SETPOINT_CHANGED = 1024,

        /** UNITS_CHANGED value */
        UNITS_CHANGED = 2048,

        /** RESET value */
        RESET = 4096,

        /** COOKING_TIMER_EXPIRED value */
        COOKING_TIMER_EXPIRED = 8192,

        /** DELTA_TEMP value */
        DELTA_TEMP = 16384
    }
}

/**
 * Properties of a BleConnectionParams.
 * @deprecated Use BleConnectionParams.$Properties instead.
 */
export interface IBleConnectionParams extends BleConnectionParams.$Properties {
}

/** Represents a BleConnectionParams. */
export class BleConnectionParams {

    /**
     * Constructs a new BleConnectionParams.
     * @param [properties] Properties to set
     */
    constructor(properties?: BleConnectionParams.$Properties);

    /** Unknown fields preserved while decoding when enabled */
    $unknowns?: Uint8Array[];

    /** BleConnectionParams slaveLatencyMs. */
    slaveLatencyMs: number;

    /** BleConnectionParams connectionIntervalMinMs. */
    connectionIntervalMinMs: number;

    /** BleConnectionParams connectionIntervalMaxMs. */
    connectionIntervalMaxMs: number;

    /**
     * Creates a new BleConnectionParams instance using the specified properties.
     * @param [properties] Properties to set
     * @returns BleConnectionParams instance
     */
    static create(properties: BleConnectionParams.$Shape): BleConnectionParams & BleConnectionParams.$Shape;
    static create(properties?: BleConnectionParams.$Properties): BleConnectionParams;

    /**
     * Encodes the specified BleConnectionParams message. Does not implicitly {@link BleConnectionParams.verify|verify} messages.
     * @param message BleConnectionParams message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encode(message: BleConnectionParams.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified BleConnectionParams message, length delimited. Does not implicitly {@link BleConnectionParams.verify|verify} messages.
     * @param message BleConnectionParams message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encodeDelimited(message: BleConnectionParams.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a BleConnectionParams message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns {BleConnectionParams & BleConnectionParams.$Shape} BleConnectionParams
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BleConnectionParams & BleConnectionParams.$Shape;

    /**
     * Decodes a BleConnectionParams message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns {BleConnectionParams & BleConnectionParams.$Shape} BleConnectionParams
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): BleConnectionParams & BleConnectionParams.$Shape;

    /**
     * Verifies a BleConnectionParams message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a BleConnectionParams message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns BleConnectionParams
     */
    static fromObject(object: { [k: string]: any }): BleConnectionParams;

    /**
     * Creates a plain object from a BleConnectionParams message. Also converts values to other types if specified.
     * @param message BleConnectionParams
     * @param [options] Conversion options
     * @returns Plain object
     */
    static toObject(message: BleConnectionParams, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this BleConnectionParams to JSON.
     * @returns JSON object
     */
    toJSON(): { [k: string]: any };

    /**
     * Gets the type url for BleConnectionParams
     * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
     * @returns The type url
     */
    static getTypeUrl(prefix?: string): string;
}

export namespace BleConnectionParams {

    /** Properties of a BleConnectionParams. */
    interface $Properties {

        /** BleConnectionParams slaveLatencyMs */
        slaveLatencyMs: number;

        /** BleConnectionParams connectionIntervalMinMs */
        connectionIntervalMinMs: number;

        /** BleConnectionParams connectionIntervalMaxMs */
        connectionIntervalMaxMs: number;

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];
    }

    /** Shape of a BleConnectionParams. */
    type $Shape = BleConnectionParams.$Properties;
}

/**
 * Properties of a DeviceInfo.
 * @deprecated Use DeviceInfo.$Properties instead.
 */
export interface IDeviceInfo extends DeviceInfo.$Properties {
}

/** Represents a DeviceInfo. */
export class DeviceInfo {

    /**
     * Constructs a new DeviceInfo.
     * @param [properties] Properties to set
     */
    constructor(properties?: DeviceInfo.$Properties);

    /** Unknown fields preserved while decoding when enabled */
    $unknowns?: Uint8Array[];

    /** DeviceInfo revision. */
    revision: number;

    /** DeviceInfo modelNumber. */
    modelNumber: number;

    /** DeviceInfo boardRevision. */
    boardRevision: number;

    /** DeviceInfo bom. */
    bom: number;

    /** DeviceInfo platform. */
    platform: number;

    /** DeviceInfo cmCode. */
    cmCode: number;

    /** DeviceInfo dateCode. */
    dateCode: number;

    /** DeviceInfo serialNumber. */
    serialNumber: string;

    /**
     * Creates a new DeviceInfo instance using the specified properties.
     * @param [properties] Properties to set
     * @returns DeviceInfo instance
     */
    static create(properties: DeviceInfo.$Shape): DeviceInfo & DeviceInfo.$Shape;
    static create(properties?: DeviceInfo.$Properties): DeviceInfo;

    /**
     * Encodes the specified DeviceInfo message. Does not implicitly {@link DeviceInfo.verify|verify} messages.
     * @param message DeviceInfo message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encode(message: DeviceInfo.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified DeviceInfo message, length delimited. Does not implicitly {@link DeviceInfo.verify|verify} messages.
     * @param message DeviceInfo message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encodeDelimited(message: DeviceInfo.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a DeviceInfo message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns {DeviceInfo & DeviceInfo.$Shape} DeviceInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): DeviceInfo & DeviceInfo.$Shape;

    /**
     * Decodes a DeviceInfo message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns {DeviceInfo & DeviceInfo.$Shape} DeviceInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): DeviceInfo & DeviceInfo.$Shape;

    /**
     * Verifies a DeviceInfo message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a DeviceInfo message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns DeviceInfo
     */
    static fromObject(object: { [k: string]: any }): DeviceInfo;

    /**
     * Creates a plain object from a DeviceInfo message. Also converts values to other types if specified.
     * @param message DeviceInfo
     * @param [options] Conversion options
     * @returns Plain object
     */
    static toObject(message: DeviceInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this DeviceInfo to JSON.
     * @returns JSON object
     */
    toJSON(): { [k: string]: any };

    /**
     * Gets the type url for DeviceInfo
     * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
     * @returns The type url
     */
    static getTypeUrl(prefix?: string): string;
}

export namespace DeviceInfo {

    /** Properties of a DeviceInfo. */
    interface $Properties {

        /** DeviceInfo revision */
        revision: number;

        /** DeviceInfo modelNumber */
        modelNumber: number;

        /** DeviceInfo boardRevision */
        boardRevision: number;

        /** DeviceInfo bom */
        bom: number;

        /** DeviceInfo platform */
        platform: number;

        /** DeviceInfo cmCode */
        cmCode: number;

        /** DeviceInfo dateCode */
        dateCode: number;

        /** DeviceInfo serialNumber */
        serialNumber: string;

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];
    }

    /** Shape of a DeviceInfo. */
    type $Shape = DeviceInfo.$Properties;
}

/**
 * Properties of a FirmwareInfo.
 * @deprecated Use FirmwareInfo.$Properties instead.
 */
export interface IFirmwareInfo extends FirmwareInfo.$Properties {
}

/** Represents a FirmwareInfo. */
export class FirmwareInfo {

    /**
     * Constructs a new FirmwareInfo.
     * @param [properties] Properties to set
     */
    constructor(properties?: FirmwareInfo.$Properties);

    /** Unknown fields preserved while decoding when enabled */
    $unknowns?: Uint8Array[];

    /** FirmwareInfo commitId. */
    commitId: string;

    /** FirmwareInfo tagId. */
    tagId: string;

    /** FirmwareInfo dateCode. */
    dateCode: number;

    /**
     * Creates a new FirmwareInfo instance using the specified properties.
     * @param [properties] Properties to set
     * @returns FirmwareInfo instance
     */
    static create(properties: FirmwareInfo.$Shape): FirmwareInfo & FirmwareInfo.$Shape;
    static create(properties?: FirmwareInfo.$Properties): FirmwareInfo;

    /**
     * Encodes the specified FirmwareInfo message. Does not implicitly {@link FirmwareInfo.verify|verify} messages.
     * @param message FirmwareInfo message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encode(message: FirmwareInfo.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified FirmwareInfo message, length delimited. Does not implicitly {@link FirmwareInfo.verify|verify} messages.
     * @param message FirmwareInfo message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encodeDelimited(message: FirmwareInfo.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a FirmwareInfo message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns {FirmwareInfo & FirmwareInfo.$Shape} FirmwareInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): FirmwareInfo & FirmwareInfo.$Shape;

    /**
     * Decodes a FirmwareInfo message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns {FirmwareInfo & FirmwareInfo.$Shape} FirmwareInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): FirmwareInfo & FirmwareInfo.$Shape;

    /**
     * Verifies a FirmwareInfo message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a FirmwareInfo message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns FirmwareInfo
     */
    static fromObject(object: { [k: string]: any }): FirmwareInfo;

    /**
     * Creates a plain object from a FirmwareInfo message. Also converts values to other types if specified.
     * @param message FirmwareInfo
     * @param [options] Conversion options
     * @returns Plain object
     */
    static toObject(message: FirmwareInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this FirmwareInfo to JSON.
     * @returns JSON object
     */
    toJSON(): { [k: string]: any };

    /**
     * Gets the type url for FirmwareInfo
     * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
     * @returns The type url
     */
    static getTypeUrl(prefix?: string): string;
}

export namespace FirmwareInfo {

    /** Properties of a FirmwareInfo. */
    interface $Properties {

        /** FirmwareInfo commitId */
        commitId: string;

        /** FirmwareInfo tagId */
        tagId: string;

        /** FirmwareInfo dateCode */
        dateCode: number;

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];
    }

    /** Shape of a FirmwareInfo. */
    type $Shape = FirmwareInfo.$Properties;
}

/**
 * Properties of a DeviceState.
 * @deprecated Use DeviceState.$Properties instead.
 */
export interface IDeviceState extends DeviceState.$Properties {
}

/** Represents a DeviceState. */
export class DeviceState {

    /**
     * Constructs a new DeviceState.
     * @param [properties] Properties to set
     */
    constructor(properties?: DeviceState.$Properties);

    /** Unknown fields preserved while decoding when enabled */
    $unknowns?: Uint8Array[];

    /** DeviceState waterTemp. */
    waterTemp: SensorValue.$Properties;

    /** DeviceState alerts. */
    alerts: SysAlertBitVector.$Properties;

    /**
     * Creates a new DeviceState instance using the specified properties.
     * @param [properties] Properties to set
     * @returns DeviceState instance
     */
    static create(properties: DeviceState.$Shape): DeviceState & DeviceState.$Shape;
    static create(properties?: DeviceState.$Properties): DeviceState;

    /**
     * Encodes the specified DeviceState message. Does not implicitly {@link DeviceState.verify|verify} messages.
     * @param message DeviceState message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encode(message: DeviceState.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified DeviceState message, length delimited. Does not implicitly {@link DeviceState.verify|verify} messages.
     * @param message DeviceState message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encodeDelimited(message: DeviceState.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a DeviceState message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns {DeviceState & DeviceState.$Shape} DeviceState
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): DeviceState & DeviceState.$Shape;

    /**
     * Decodes a DeviceState message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns {DeviceState & DeviceState.$Shape} DeviceState
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): DeviceState & DeviceState.$Shape;

    /**
     * Verifies a DeviceState message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a DeviceState message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns DeviceState
     */
    static fromObject(object: { [k: string]: any }): DeviceState;

    /**
     * Creates a plain object from a DeviceState message. Also converts values to other types if specified.
     * @param message DeviceState
     * @param [options] Conversion options
     * @returns Plain object
     */
    static toObject(message: DeviceState, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this DeviceState to JSON.
     * @returns JSON object
     */
    toJSON(): { [k: string]: any };

    /**
     * Gets the type url for DeviceState
     * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
     * @returns The type url
     */
    static getTypeUrl(prefix?: string): string;
}

export namespace DeviceState {

    /** Properties of a DeviceState. */
    interface $Properties {

        /** DeviceState waterTemp */
        waterTemp: SensorValue.$Properties;

        /** DeviceState alerts */
        alerts: SysAlertBitVector.$Properties;

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];
    }

    /** Shape of a DeviceState. */
    type $Shape = DeviceState.$Properties;
}
