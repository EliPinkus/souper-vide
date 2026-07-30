/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-mixed-operators, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars, default-case, jsdoc/require-param*/
import $protobuf from "protobufjs/minimal.js";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;
const $Object = $util.global.Object, $undefined = $util.global.undefined, $Error = $util.global.Error, $TypeError = $util.global.TypeError, $String = $util.global.String, $Array = $util.global.Array;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

/**
 * DomainType enum.
 * @name DomainType
 * @enum {number}
 * @property {number} ANOVA_DOMAIN_ID_CONFIG=0 ANOVA_DOMAIN_ID_CONFIG value
 * @property {number} ANOVA_DOMAIN_ID_BULK_TRANSFER=1 ANOVA_DOMAIN_ID_BULK_TRANSFER value
 * @property {number} ANOVA_DOMAIN_ID_COUNT=2 ANOVA_DOMAIN_ID_COUNT value
 */
export const DomainType = $root.DomainType = (() => {
    const valuesById = $Object.create(null), values = $Object.create(valuesById);
    values[valuesById[0] = "ANOVA_DOMAIN_ID_CONFIG"] = 0;
    values[valuesById[1] = "ANOVA_DOMAIN_ID_BULK_TRANSFER"] = 1;
    values[valuesById[2] = "ANOVA_DOMAIN_ID_COUNT"] = 2;
    return values;
})();

/**
 * BulkDomainMessageType enum.
 * @name BulkDomainMessageType
 * @enum {number}
 * @property {number} MSG_TYPE_PAGE_GET=0 MSG_TYPE_PAGE_GET value
 * @property {number} MSG_TYPE_PAGE_PUT=1 MSG_TYPE_PAGE_PUT value
 * @property {number} MSG_TYPE_FILE_ERASE=2 MSG_TYPE_FILE_ERASE value
 * @property {number} MSG_TYPE_FILE_PROPS=3 MSG_TYPE_FILE_PROPS value
 * @property {number} MSG_TYPE_SYSTEM_RESET=4 MSG_TYPE_SYSTEM_RESET value
 * @property {number} MSG_TYPE_COUNT=5 MSG_TYPE_COUNT value
 */
export const BulkDomainMessageType = $root.BulkDomainMessageType = (() => {
    const valuesById = $Object.create(null), values = $Object.create(valuesById);
    values[valuesById[0] = "MSG_TYPE_PAGE_GET"] = 0;
    values[valuesById[1] = "MSG_TYPE_PAGE_PUT"] = 1;
    values[valuesById[2] = "MSG_TYPE_FILE_ERASE"] = 2;
    values[valuesById[3] = "MSG_TYPE_FILE_PROPS"] = 3;
    values[valuesById[4] = "MSG_TYPE_SYSTEM_RESET"] = 4;
    values[valuesById[5] = "MSG_TYPE_COUNT"] = 5;
    return values;
})();

/**
 * UnitType enum.
 * @name UnitType
 * @enum {number}
 * @property {number} DEGREES_POINT_1C=0 DEGREES_POINT_1C value
 * @property {number} DEGREES_POINT_1F=1 DEGREES_POINT_1F value
 * @property {number} MOTOR_SPEED=2 MOTOR_SPEED value
 * @property {number} BOOLEAN=3 BOOLEAN value
 * @property {number} DEGREES_POINT_01C=4 DEGREES_POINT_01C value
 * @property {number} DEGREES_POINT_01F=5 DEGREES_POINT_01F value
 * @property {number} DEGREES_C=6 DEGREES_C value
 * @property {number} DEGREES_F=7 DEGREES_F value
 */
export const UnitType = $root.UnitType = (() => {
    const valuesById = $Object.create(null), values = $Object.create(valuesById);
    values[valuesById[0] = "DEGREES_POINT_1C"] = 0;
    values[valuesById[1] = "DEGREES_POINT_1F"] = 1;
    values[valuesById[2] = "MOTOR_SPEED"] = 2;
    values[valuesById[3] = "BOOLEAN"] = 3;
    values[valuesById[4] = "DEGREES_POINT_01C"] = 4;
    values[valuesById[5] = "DEGREES_POINT_01F"] = 5;
    values[valuesById[6] = "DEGREES_C"] = 6;
    values[valuesById[7] = "DEGREES_F"] = 7;
    return values;
})();

/**
 * MessageError enum.
 * @name MessageError
 * @enum {number}
 * @property {number} MSG_ERR_NONE=0 MSG_ERR_NONE value
 * @property {number} MSG_ERR_FAILED=1 MSG_ERR_FAILED value
 * @property {number} MSG_ERR_RESOURCE_IN_USE=2 MSG_ERR_RESOURCE_IN_USE value
 * @property {number} MSG_ERR_RX_OVERRUN=3 MSG_ERR_RX_OVERRUN value
 * @property {number} MSG_ERR_TX_OVERRUN=4 MSG_ERR_TX_OVERRUN value
 * @property {number} MSG_ERR_UNKNOWN_COMMAND=5 MSG_ERR_UNKNOWN_COMMAND value
 * @property {number} MSG_ERR_LENGTH=6 MSG_ERR_LENGTH value
 * @property {number} MSG_ERR_RESOURCE_INVALID=7 MSG_ERR_RESOURCE_INVALID value
 * @property {number} MSG_ERR_OP_UNSUPPORTED=8 MSG_ERR_OP_UNSUPPORTED value
 */
export const MessageError = $root.MessageError = (() => {
    const valuesById = $Object.create(null), values = $Object.create(valuesById);
    values[valuesById[0] = "MSG_ERR_NONE"] = 0;
    values[valuesById[1] = "MSG_ERR_FAILED"] = 1;
    values[valuesById[2] = "MSG_ERR_RESOURCE_IN_USE"] = 2;
    values[valuesById[3] = "MSG_ERR_RX_OVERRUN"] = 3;
    values[valuesById[4] = "MSG_ERR_TX_OVERRUN"] = 4;
    values[valuesById[5] = "MSG_ERR_UNKNOWN_COMMAND"] = 5;
    values[valuesById[6] = "MSG_ERR_LENGTH"] = 6;
    values[valuesById[7] = "MSG_ERR_RESOURCE_INVALID"] = 7;
    values[valuesById[8] = "MSG_ERR_OP_UNSUPPORTED"] = 8;
    return values;
})();

/**
 * ConfigDomainMessageType enum.
 * @name ConfigDomainMessageType
 * @enum {number}
 * @property {number} LOOPBACK=0 LOOPBACK value
 * @property {number} CLI_TEXT=1 CLI_TEXT value
 * @property {number} SAY_HELLO=2 SAY_HELLO value
 * @property {number} SET_TEMP_SETPOINT=3 SET_TEMP_SETPOINT value
 * @property {number} GET_TEMP_SETPOINT=4 GET_TEMP_SETPOINT value
 * @property {number} GET_SENSORS=5 GET_SENSORS value
 * @property {number} SET_TEMP_UNITS=6 SET_TEMP_UNITS value
 * @property {number} GET_TEMP_UNITS=7 GET_TEMP_UNITS value
 * @property {number} SET_COOKING_POWER_LEVEL=8 SET_COOKING_POWER_LEVEL value
 * @property {number} GET_COOKING_POWER_LEVEL=9 GET_COOKING_POWER_LEVEL value
 * @property {number} START_COOKING=10 START_COOKING value
 * @property {number} STOP_COOKING=11 STOP_COOKING value
 * @property {number} SET_SOUND_LEVEL=12 SET_SOUND_LEVEL value
 * @property {number} GET_SOUND_LEVEL=13 GET_SOUND_LEVEL value
 * @property {number} SET_DISPLAY_BRIGHTNESS=14 SET_DISPLAY_BRIGHTNESS value
 * @property {number} GET_DISPLAY_BRIGHTNESS=15 GET_DISPLAY_BRIGHTNESS value
 * @property {number} SET_COOKING_TIMER=16 SET_COOKING_TIMER value
 * @property {number} STOP_COOKING_TIMER=17 STOP_COOKING_TIMER value
 * @property {number} GET_COOKING_TIMER=18 GET_COOKING_TIMER value
 * @property {number} CANCEL_COOKING_TIMER=19 CANCEL_COOKING_TIMER value
 * @property {number} SET_CHANGE_POINT=20 SET_CHANGE_POINT value
 * @property {number} CHANGE_POINT=22 CHANGE_POINT value
 * @property {number} SET_BLE_PARAMS=23 SET_BLE_PARAMS value
 * @property {number} BLE_PARAMS=24 BLE_PARAMS value
 * @property {number} GET_DEVICE_INFO=25 GET_DEVICE_INFO value
 * @property {number} GET_FIRMWARE_INFO=26 GET_FIRMWARE_INFO value
 * @property {number} SYSTEM_ALERT_VECTOR=27 SYSTEM_ALERT_VECTOR value
 * @property {number} RESERVED28=28 RESERVED28 value
 * @property {number} MESSAGE_SPOOF=29 MESSAGE_SPOOF value
 */
export const ConfigDomainMessageType = $root.ConfigDomainMessageType = (() => {
    const valuesById = $Object.create(null), values = $Object.create(valuesById);
    values[valuesById[0] = "LOOPBACK"] = 0;
    values[valuesById[1] = "CLI_TEXT"] = 1;
    values[valuesById[2] = "SAY_HELLO"] = 2;
    values[valuesById[3] = "SET_TEMP_SETPOINT"] = 3;
    values[valuesById[4] = "GET_TEMP_SETPOINT"] = 4;
    values[valuesById[5] = "GET_SENSORS"] = 5;
    values[valuesById[6] = "SET_TEMP_UNITS"] = 6;
    values[valuesById[7] = "GET_TEMP_UNITS"] = 7;
    values[valuesById[8] = "SET_COOKING_POWER_LEVEL"] = 8;
    values[valuesById[9] = "GET_COOKING_POWER_LEVEL"] = 9;
    values[valuesById[10] = "START_COOKING"] = 10;
    values[valuesById[11] = "STOP_COOKING"] = 11;
    values[valuesById[12] = "SET_SOUND_LEVEL"] = 12;
    values[valuesById[13] = "GET_SOUND_LEVEL"] = 13;
    values[valuesById[14] = "SET_DISPLAY_BRIGHTNESS"] = 14;
    values[valuesById[15] = "GET_DISPLAY_BRIGHTNESS"] = 15;
    values[valuesById[16] = "SET_COOKING_TIMER"] = 16;
    values[valuesById[17] = "STOP_COOKING_TIMER"] = 17;
    values[valuesById[18] = "GET_COOKING_TIMER"] = 18;
    values[valuesById[19] = "CANCEL_COOKING_TIMER"] = 19;
    values[valuesById[20] = "SET_CHANGE_POINT"] = 20;
    values[valuesById[22] = "CHANGE_POINT"] = 22;
    values[valuesById[23] = "SET_BLE_PARAMS"] = 23;
    values[valuesById[24] = "BLE_PARAMS"] = 24;
    values[valuesById[25] = "GET_DEVICE_INFO"] = 25;
    values[valuesById[26] = "GET_FIRMWARE_INFO"] = 26;
    values[valuesById[27] = "SYSTEM_ALERT_VECTOR"] = 27;
    values[valuesById[28] = "RESERVED28"] = 28;
    values[valuesById[29] = "MESSAGE_SPOOF"] = 29;
    return values;
})();

/**
 * TransferStatusError enum.
 * @name TransferStatusError
 * @enum {number}
 * @property {number} TR_STATUS_OK=0 TR_STATUS_OK value
 * @property {number} TR_STATUS_PAGE_INVALID=1 TR_STATUS_PAGE_INVALID value
 * @property {number} TR_STATUS_PAGE_IN_USE=2 TR_STATUS_PAGE_IN_USE value
 * @property {number} TR_STATUS_PAGE_CORRUPT=3 TR_STATUS_PAGE_CORRUPT value
 * @property {number} TR_STATUS_INVALID_FILE_HANDLE=4 TR_STATUS_INVALID_FILE_HANDLE value
 * @property {number} TR_STATUS_FAILED=5 TR_STATUS_FAILED value
 */
export const TransferStatusError = $root.TransferStatusError = (() => {
    const valuesById = $Object.create(null), values = $Object.create(valuesById);
    values[valuesById[0] = "TR_STATUS_OK"] = 0;
    values[valuesById[1] = "TR_STATUS_PAGE_INVALID"] = 1;
    values[valuesById[2] = "TR_STATUS_PAGE_IN_USE"] = 2;
    values[valuesById[3] = "TR_STATUS_PAGE_CORRUPT"] = 3;
    values[valuesById[4] = "TR_STATUS_INVALID_FILE_HANDLE"] = 4;
    values[valuesById[5] = "TR_STATUS_FAILED"] = 5;
    return values;
})();

/**
 * FileHandleType enum.
 * @name FileHandleType
 * @enum {number}
 * @property {number} FILE_HANDLE_PSUDO=0 FILE_HANDLE_PSUDO value
 * @property {number} FILE_HANDLE_LOG=1 FILE_HANDLE_LOG value
 * @property {number} FILE_HANDLE_OTA=2 FILE_HANDLE_OTA value
 */
export const FileHandleType = $root.FileHandleType = (() => {
    const valuesById = $Object.create(null), values = $Object.create(valuesById);
    values[valuesById[0] = "FILE_HANDLE_PSUDO"] = 0;
    values[valuesById[1] = "FILE_HANDLE_LOG"] = 1;
    values[valuesById[2] = "FILE_HANDLE_OTA"] = 2;
    return values;
})();

export const IntegerValue = $root.IntegerValue = (() => {

    /**
     * Properties of an IntegerValue.
     * @typedef {Object} IntegerValue.$Properties
     * @property {number} value IntegerValue value
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
     */

    /**
     * Properties of an IntegerValue.
     * @exports IIntegerValue
     * @interface IIntegerValue
     * @augments IntegerValue.$Properties
     * @deprecated Use IntegerValue.$Properties instead.
     */

    /**
     * Shape of an IntegerValue.
     * @typedef {IntegerValue.$Properties} IntegerValue.$Shape
     */

    /**
     * Constructs a new IntegerValue.
     * @exports IntegerValue
     * @classdesc Represents an IntegerValue.
     * @constructor
     * @param {IntegerValue.$Properties=} [properties] Properties to set
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
     */
    const IntegerValue = function (properties) {
        if (properties)
            for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                    this[keys[i]] = properties[keys[i]];
    };

    /**
     * IntegerValue value.
     * @member {number} value
     * @memberof IntegerValue
     * @instance
     */
    IntegerValue.prototype.value = 0;

    /**
     * Creates a new IntegerValue instance using the specified properties.
     * @function create
     * @memberof IntegerValue
     * @static
     * @param {IntegerValue.$Properties=} [properties] Properties to set
     * @returns {IntegerValue} IntegerValue instance
     * @type {{
     *   (properties: IntegerValue.$Shape): IntegerValue & IntegerValue.$Shape;
     *   (properties?: IntegerValue.$Properties): IntegerValue;
     * }}
     */
    IntegerValue.create = function(properties) {
        return new IntegerValue(properties);
    };

    /**
     * Encodes the specified IntegerValue message. Does not implicitly {@link IntegerValue.verify|verify} messages.
     * @function encode
     * @memberof IntegerValue
     * @static
     * @param {IntegerValue.$Properties} message IntegerValue message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    IntegerValue.encode = function (message, writer, _depth) {
        if (!writer)
            writer = $Writer.create();
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.value);
        if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
            for (let i = 0; i < message.$unknowns.length; ++i)
                writer.raw(message.$unknowns[i]);
        return writer;
    };

    /**
     * Encodes the specified IntegerValue message, length delimited. Does not implicitly {@link IntegerValue.verify|verify} messages.
     * @function encodeDelimited
     * @memberof IntegerValue
     * @static
     * @param {IntegerValue.$Properties} message IntegerValue message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    IntegerValue.encodeDelimited = function(message, writer) {
        return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
    };

    /**
     * Decodes an IntegerValue message from the specified reader or buffer.
     * @function decode
     * @memberof IntegerValue
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {IntegerValue & IntegerValue.$Shape} IntegerValue
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    IntegerValue.decode = function (reader, length, _end, _depth, _target) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $Reader.recursionLimit)
            throw $Error("max depth exceeded");
        let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.IntegerValue();
        while (reader.pos < end) {
            let start = reader.pos;
            let tag = reader.tag();
            if (tag === _end) {
                _end = $undefined;
                break;
            }
            let wireType = tag & 7;
            switch (tag >>>= 3) {
            case 1: {
                    if (wireType !== 0)
                        break;
                    message.value = reader.int32();
                    continue;
                }
            }
            reader.skipType(wireType, _depth, tag);
            if (!reader.discardUnknown) {
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
            }
        }
        if (_end !== $undefined)
            throw $Error("missing end group");
        if (!$Object.hasOwnProperty.call(message, "value"))
            throw $util.ProtocolError("missing required 'value'", { instance: message });
        return message;
    };

    /**
     * Decodes an IntegerValue message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof IntegerValue
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {IntegerValue & IntegerValue.$Shape} IntegerValue
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    IntegerValue.decodeDelimited = function(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an IntegerValue message.
     * @function verify
     * @memberof IntegerValue
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    IntegerValue.verify = function (message, _depth) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            return "max depth exceeded";
        if (!$util.isInteger(message.value))
            return "value: integer expected";
        return null;
    };

    /**
     * Creates an IntegerValue message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof IntegerValue
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {IntegerValue} IntegerValue
     */
    IntegerValue.fromObject = function (object, _depth) {
        if (object instanceof $root.IntegerValue)
            return object;
        if (!$util.isObject(object))
            throw $TypeError(".IntegerValue: object expected");
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        let message = new $root.IntegerValue();
        if (object.value != null)
            message.value = object.value | 0;
        return message;
    };

    /**
     * Creates a plain object from an IntegerValue message. Also converts values to other types if specified.
     * @function toObject
     * @memberof IntegerValue
     * @static
     * @param {IntegerValue} message IntegerValue
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    IntegerValue.toObject = function (message, options, _depth) {
        if (!options)
            options = {};
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        let object = {};
        if (options.defaults)
            object.value = 0;
        if (message.value != null && $Object.hasOwnProperty.call(message, "value"))
            object.value = message.value;
        return object;
    };

    /**
     * Converts this IntegerValue to JSON.
     * @function toJSON
     * @memberof IntegerValue
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    IntegerValue.prototype.toJSON = function() {
        return IntegerValue.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the type url for IntegerValue
     * @function getTypeUrl
     * @memberof IntegerValue
     * @static
     * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
     * @returns {string} The type url
     */
    IntegerValue.getTypeUrl = function(prefix) {
        if (prefix === $undefined)
            prefix = "type.googleapis.com";
        return prefix + "/IntegerValue";
    };

    return IntegerValue;
})();

export const SensorValue = $root.SensorValue = (() => {

    /**
     * Properties of a SensorValue.
     * @typedef {Object} SensorValue.$Properties
     * @property {number} value SensorValue value
     * @property {UnitType} units SensorValue units
     * @property {SensorValue.SensorType} sensorType SensorValue sensorType
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
     */

    /**
     * Properties of a SensorValue.
     * @exports ISensorValue
     * @interface ISensorValue
     * @augments SensorValue.$Properties
     * @deprecated Use SensorValue.$Properties instead.
     */

    /**
     * Shape of a SensorValue.
     * @typedef {SensorValue.$Properties} SensorValue.$Shape
     */

    /**
     * Constructs a new SensorValue.
     * @exports SensorValue
     * @classdesc Represents a SensorValue.
     * @constructor
     * @param {SensorValue.$Properties=} [properties] Properties to set
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
     */
    const SensorValue = function (properties) {
        if (properties)
            for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                    this[keys[i]] = properties[keys[i]];
    };

    /**
     * SensorValue value.
     * @member {number} value
     * @memberof SensorValue
     * @instance
     */
    SensorValue.prototype.value = 0;

    /**
     * SensorValue units.
     * @member {UnitType} units
     * @memberof SensorValue
     * @instance
     */
    SensorValue.prototype.units = 0;

    /**
     * SensorValue sensorType.
     * @member {SensorValue.SensorType} sensorType
     * @memberof SensorValue
     * @instance
     */
    SensorValue.prototype.sensorType = 0;

    /**
     * Creates a new SensorValue instance using the specified properties.
     * @function create
     * @memberof SensorValue
     * @static
     * @param {SensorValue.$Properties=} [properties] Properties to set
     * @returns {SensorValue} SensorValue instance
     * @type {{
     *   (properties: SensorValue.$Shape): SensorValue & SensorValue.$Shape;
     *   (properties?: SensorValue.$Properties): SensorValue;
     * }}
     */
    SensorValue.create = function(properties) {
        return new SensorValue(properties);
    };

    /**
     * Encodes the specified SensorValue message. Does not implicitly {@link SensorValue.verify|verify} messages.
     * @function encode
     * @memberof SensorValue
     * @static
     * @param {SensorValue.$Properties} message SensorValue message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SensorValue.encode = function (message, writer, _depth) {
        if (!writer)
            writer = $Writer.create();
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.value);
        writer.uint32(/* id 2, wireType 0 =*/16).int32(message.units);
        writer.uint32(/* id 3, wireType 0 =*/24).int32(message.sensorType);
        if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
            for (let i = 0; i < message.$unknowns.length; ++i)
                writer.raw(message.$unknowns[i]);
        return writer;
    };

    /**
     * Encodes the specified SensorValue message, length delimited. Does not implicitly {@link SensorValue.verify|verify} messages.
     * @function encodeDelimited
     * @memberof SensorValue
     * @static
     * @param {SensorValue.$Properties} message SensorValue message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SensorValue.encodeDelimited = function(message, writer) {
        return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
    };

    /**
     * Decodes a SensorValue message from the specified reader or buffer.
     * @function decode
     * @memberof SensorValue
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {SensorValue & SensorValue.$Shape} SensorValue
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SensorValue.decode = function (reader, length, _end, _depth, _target) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $Reader.recursionLimit)
            throw $Error("max depth exceeded");
        let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.SensorValue(), value;
        while (reader.pos < end) {
            let start = reader.pos;
            let tag = reader.tag();
            if (tag === _end) {
                _end = $undefined;
                break;
            }
            let wireType = tag & 7;
            switch (tag >>>= 3) {
            case 1: {
                    if (wireType !== 0)
                        break;
                    message.value = reader.int32();
                    continue;
                }
            case 2: {
                    if (wireType !== 0)
                        break;
                    value = reader.int32();
                    if ($root.UnitType[value] !== $undefined)
                        message.units = value;
                    else if (!reader.discardUnknown) {
                        $util.makeProp(message, "$unknowns", false);
                        (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                    }
                    continue;
                }
            case 3: {
                    if (wireType !== 0)
                        break;
                    value = reader.int32();
                    if ($root.SensorValue.SensorType[value] !== $undefined)
                        message.sensorType = value;
                    else if (!reader.discardUnknown) {
                        $util.makeProp(message, "$unknowns", false);
                        (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                    }
                    continue;
                }
            }
            reader.skipType(wireType, _depth, tag);
            if (!reader.discardUnknown) {
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
            }
        }
        if (_end !== $undefined)
            throw $Error("missing end group");
        if (!$Object.hasOwnProperty.call(message, "value"))
            throw $util.ProtocolError("missing required 'value'", { instance: message });
        if (!$Object.hasOwnProperty.call(message, "units"))
            throw $util.ProtocolError("missing required 'units'", { instance: message });
        if (!$Object.hasOwnProperty.call(message, "sensorType"))
            throw $util.ProtocolError("missing required 'sensorType'", { instance: message });
        return message;
    };

    /**
     * Decodes a SensorValue message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof SensorValue
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {SensorValue & SensorValue.$Shape} SensorValue
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SensorValue.decodeDelimited = function(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a SensorValue message.
     * @function verify
     * @memberof SensorValue
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    SensorValue.verify = function (message, _depth) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            return "max depth exceeded";
        if (!$util.isInteger(message.value))
            return "value: integer expected";
        switch (message.units) {
        default:
            return "units: enum value expected";
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
            break;
        }
        switch (message.sensorType) {
        default:
            return "sensorType: enum value expected";
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
            break;
        }
        return null;
    };

    /**
     * Creates a SensorValue message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof SensorValue
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {SensorValue} SensorValue
     */
    SensorValue.fromObject = function (object, _depth) {
        if (object instanceof $root.SensorValue)
            return object;
        if (!$util.isObject(object))
            throw $TypeError(".SensorValue: object expected");
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        let message = new $root.SensorValue();
        if (object.value != null)
            message.value = object.value | 0;
        switch (object.units) {
        case "DEGREES_POINT_1C":
        case 0:
            message.units = 0;
            break;
        case "DEGREES_POINT_1F":
        case 1:
            message.units = 1;
            break;
        case "MOTOR_SPEED":
        case 2:
            message.units = 2;
            break;
        case "BOOLEAN":
        case 3:
            message.units = 3;
            break;
        case "DEGREES_POINT_01C":
        case 4:
            message.units = 4;
            break;
        case "DEGREES_POINT_01F":
        case 5:
            message.units = 5;
            break;
        case "DEGREES_C":
        case 6:
            message.units = 6;
            break;
        case "DEGREES_F":
        case 7:
            message.units = 7;
            break;
        default:
        }
        switch (object.sensorType) {
        case "WaterTemp":
        case 0:
            message.sensorType = 0;
            break;
        case "HeaterTemp":
        case 1:
            message.sensorType = 1;
            break;
        case "TriacTemp":
        case 2:
            message.sensorType = 2;
            break;
        case "UnusedTemp":
        case 3:
            message.sensorType = 3;
            break;
        case "InternalTemp":
        case 4:
            message.sensorType = 4;
            break;
        case "WaterLow":
        case 5:
            message.sensorType = 5;
            break;
        case "WaterLeak":
        case 6:
            message.sensorType = 6;
            break;
        case "MotorSpeed":
        case 7:
            message.sensorType = 7;
            break;
        default:
        }
        return message;
    };

    /**
     * Creates a plain object from a SensorValue message. Also converts values to other types if specified.
     * @function toObject
     * @memberof SensorValue
     * @static
     * @param {SensorValue} message SensorValue
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    SensorValue.toObject = function (message, options, _depth) {
        if (!options)
            options = {};
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        let object = {};
        if (options.defaults) {
            object.value = 0;
            object.units = options.enums === $String ? "DEGREES_POINT_1C" : 0;
            object.sensorType = options.enums === $String ? "WaterTemp" : 0;
        }
        if (message.value != null && $Object.hasOwnProperty.call(message, "value"))
            object.value = message.value;
        if (message.units != null && $Object.hasOwnProperty.call(message, "units"))
            object.units = options.enums === $String ? $root.UnitType[message.units] === $undefined ? message.units : $root.UnitType[message.units] : message.units;
        if (message.sensorType != null && $Object.hasOwnProperty.call(message, "sensorType"))
            object.sensorType = options.enums === $String ? $root.SensorValue.SensorType[message.sensorType] === $undefined ? message.sensorType : $root.SensorValue.SensorType[message.sensorType] : message.sensorType;
        return object;
    };

    /**
     * Converts this SensorValue to JSON.
     * @function toJSON
     * @memberof SensorValue
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    SensorValue.prototype.toJSON = function() {
        return SensorValue.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the type url for SensorValue
     * @function getTypeUrl
     * @memberof SensorValue
     * @static
     * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
     * @returns {string} The type url
     */
    SensorValue.getTypeUrl = function(prefix) {
        if (prefix === $undefined)
            prefix = "type.googleapis.com";
        return prefix + "/SensorValue";
    };

    /**
     * SensorType enum.
     * @name SensorValue.SensorType
     * @enum {number}
     * @property {number} WaterTemp=0 WaterTemp value
     * @property {number} HeaterTemp=1 HeaterTemp value
     * @property {number} TriacTemp=2 TriacTemp value
     * @property {number} UnusedTemp=3 UnusedTemp value
     * @property {number} InternalTemp=4 InternalTemp value
     * @property {number} WaterLow=5 WaterLow value
     * @property {number} WaterLeak=6 WaterLeak value
     * @property {number} MotorSpeed=7 MotorSpeed value
     */
    SensorValue.SensorType = (function() {
        const valuesById = $Object.create(null), values = $Object.create(valuesById);
        values[valuesById[0] = "WaterTemp"] = 0;
        values[valuesById[1] = "HeaterTemp"] = 1;
        values[valuesById[2] = "TriacTemp"] = 2;
        values[valuesById[3] = "UnusedTemp"] = 3;
        values[valuesById[4] = "InternalTemp"] = 4;
        values[valuesById[5] = "WaterLow"] = 5;
        values[valuesById[6] = "WaterLeak"] = 6;
        values[valuesById[7] = "MotorSpeed"] = 7;
        return values;
    })();

    return SensorValue;
})();

export const SensorValueList = $root.SensorValueList = (() => {

    /**
     * Properties of a SensorValueList.
     * @typedef {Object} SensorValueList.$Properties
     * @property {Array.<SensorValue.$Properties>|null} [values] SensorValueList values
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
     */

    /**
     * Properties of a SensorValueList.
     * @exports ISensorValueList
     * @interface ISensorValueList
     * @augments SensorValueList.$Properties
     * @deprecated Use SensorValueList.$Properties instead.
     */

    /**
     * Shape of a SensorValueList.
     * @typedef {SensorValueList.$Properties} SensorValueList.$Shape
     */

    /**
     * Constructs a new SensorValueList.
     * @exports SensorValueList
     * @classdesc Represents a SensorValueList.
     * @constructor
     * @param {SensorValueList.$Properties=} [properties] Properties to set
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
     */
    const SensorValueList = function (properties) {
        this.values = [];
        if (properties)
            for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                    this[keys[i]] = properties[keys[i]];
    };

    /**
     * SensorValueList values.
     * @member {Array.<SensorValue.$Properties>} values
     * @memberof SensorValueList
     * @instance
     */
    SensorValueList.prototype.values = $util.emptyArray;

    /**
     * Creates a new SensorValueList instance using the specified properties.
     * @function create
     * @memberof SensorValueList
     * @static
     * @param {SensorValueList.$Properties=} [properties] Properties to set
     * @returns {SensorValueList} SensorValueList instance
     * @type {{
     *   (properties: SensorValueList.$Shape): SensorValueList & SensorValueList.$Shape;
     *   (properties?: SensorValueList.$Properties): SensorValueList;
     * }}
     */
    SensorValueList.create = function(properties) {
        return new SensorValueList(properties);
    };

    /**
     * Encodes the specified SensorValueList message. Does not implicitly {@link SensorValueList.verify|verify} messages.
     * @function encode
     * @memberof SensorValueList
     * @static
     * @param {SensorValueList.$Properties} message SensorValueList message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SensorValueList.encode = function (message, writer, _depth) {
        if (!writer)
            writer = $Writer.create();
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        if (message.values != null && message.values.length)
            for (let i = 0; i < message.values.length; ++i)
                $root.SensorValue.encode(message.values[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), _depth + 1).ldelim();
        if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
            for (let i = 0; i < message.$unknowns.length; ++i)
                writer.raw(message.$unknowns[i]);
        return writer;
    };

    /**
     * Encodes the specified SensorValueList message, length delimited. Does not implicitly {@link SensorValueList.verify|verify} messages.
     * @function encodeDelimited
     * @memberof SensorValueList
     * @static
     * @param {SensorValueList.$Properties} message SensorValueList message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SensorValueList.encodeDelimited = function(message, writer) {
        return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
    };

    /**
     * Decodes a SensorValueList message from the specified reader or buffer.
     * @function decode
     * @memberof SensorValueList
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {SensorValueList & SensorValueList.$Shape} SensorValueList
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SensorValueList.decode = function (reader, length, _end, _depth, _target) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $Reader.recursionLimit)
            throw $Error("max depth exceeded");
        let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.SensorValueList();
        while (reader.pos < end) {
            let start = reader.pos;
            let tag = reader.tag();
            if (tag === _end) {
                _end = $undefined;
                break;
            }
            let wireType = tag & 7;
            switch (tag >>>= 3) {
            case 1: {
                    if (wireType !== 2)
                        break;
                    if (!(message.values && message.values.length))
                        message.values = [];
                    message.values.push($root.SensorValue.decode(reader, reader.uint32(), $undefined, _depth + 1));
                    continue;
                }
            }
            reader.skipType(wireType, _depth, tag);
            if (!reader.discardUnknown) {
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
            }
        }
        if (_end !== $undefined)
            throw $Error("missing end group");
        return message;
    };

    /**
     * Decodes a SensorValueList message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof SensorValueList
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {SensorValueList & SensorValueList.$Shape} SensorValueList
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SensorValueList.decodeDelimited = function(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a SensorValueList message.
     * @function verify
     * @memberof SensorValueList
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    SensorValueList.verify = function (message, _depth) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            return "max depth exceeded";
        if (message.values != null && $Object.hasOwnProperty.call(message, "values")) {
            if (!$Array.isArray(message.values))
                return "values: array expected";
            for (let i = 0; i < message.values.length; ++i) {
                let error = $root.SensorValue.verify(message.values[i], _depth + 1);
                if (error)
                    return "values." + error;
            }
        }
        return null;
    };

    /**
     * Creates a SensorValueList message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof SensorValueList
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {SensorValueList} SensorValueList
     */
    SensorValueList.fromObject = function (object, _depth) {
        if (object instanceof $root.SensorValueList)
            return object;
        if (!$util.isObject(object))
            throw $TypeError(".SensorValueList: object expected");
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        let message = new $root.SensorValueList();
        if (object.values) {
            if (!$Array.isArray(object.values))
                throw $TypeError(".SensorValueList.values: array expected");
            message.values = $Array(object.values.length);
            for (let i = 0; i < object.values.length; ++i) {
                if (!$util.isObject(object.values[i]))
                    throw $TypeError(".SensorValueList.values: object expected");
                message.values[i] = $root.SensorValue.fromObject(object.values[i], _depth + 1);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from a SensorValueList message. Also converts values to other types if specified.
     * @function toObject
     * @memberof SensorValueList
     * @static
     * @param {SensorValueList} message SensorValueList
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    SensorValueList.toObject = function (message, options, _depth) {
        if (!options)
            options = {};
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        let object = {};
        if (options.arrays || options.defaults)
            object.values = [];
        if (message.values && message.values.length) {
            object.values = $Array(message.values.length);
            for (let j = 0; j < message.values.length; ++j)
                object.values[j] = $root.SensorValue.toObject(message.values[j], options, _depth + 1);
        }
        return object;
    };

    /**
     * Converts this SensorValueList to JSON.
     * @function toJSON
     * @memberof SensorValueList
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    SensorValueList.prototype.toJSON = function() {
        return SensorValueList.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the type url for SensorValueList
     * @function getTypeUrl
     * @memberof SensorValueList
     * @static
     * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
     * @returns {string} The type url
     */
    SensorValueList.getTypeUrl = function(prefix) {
        if (prefix === $undefined)
            prefix = "type.googleapis.com";
        return prefix + "/SensorValueList";
    };

    return SensorValueList;
})();

export const SysAlertBitVector = $root.SysAlertBitVector = (() => {

    /**
     * Properties of a SysAlertBitVector.
     * @typedef {Object} SysAlertBitVector.$Properties
     * @property {number} prevSetVector SysAlertBitVector prevSetVector
     * @property {number} currVector SysAlertBitVector currVector
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
     */

    /**
     * Properties of a SysAlertBitVector.
     * @exports ISysAlertBitVector
     * @interface ISysAlertBitVector
     * @augments SysAlertBitVector.$Properties
     * @deprecated Use SysAlertBitVector.$Properties instead.
     */

    /**
     * Shape of a SysAlertBitVector.
     * @typedef {SysAlertBitVector.$Properties} SysAlertBitVector.$Shape
     */

    /**
     * Constructs a new SysAlertBitVector.
     * @exports SysAlertBitVector
     * @classdesc Represents a SysAlertBitVector.
     * @constructor
     * @param {SysAlertBitVector.$Properties=} [properties] Properties to set
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
     */
    const SysAlertBitVector = function (properties) {
        if (properties)
            for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                    this[keys[i]] = properties[keys[i]];
    };

    /**
     * SysAlertBitVector prevSetVector.
     * @member {number} prevSetVector
     * @memberof SysAlertBitVector
     * @instance
     */
    SysAlertBitVector.prototype.prevSetVector = 0;

    /**
     * SysAlertBitVector currVector.
     * @member {number} currVector
     * @memberof SysAlertBitVector
     * @instance
     */
    SysAlertBitVector.prototype.currVector = 0;

    /**
     * Creates a new SysAlertBitVector instance using the specified properties.
     * @function create
     * @memberof SysAlertBitVector
     * @static
     * @param {SysAlertBitVector.$Properties=} [properties] Properties to set
     * @returns {SysAlertBitVector} SysAlertBitVector instance
     * @type {{
     *   (properties: SysAlertBitVector.$Shape): SysAlertBitVector & SysAlertBitVector.$Shape;
     *   (properties?: SysAlertBitVector.$Properties): SysAlertBitVector;
     * }}
     */
    SysAlertBitVector.create = function(properties) {
        return new SysAlertBitVector(properties);
    };

    /**
     * Encodes the specified SysAlertBitVector message. Does not implicitly {@link SysAlertBitVector.verify|verify} messages.
     * @function encode
     * @memberof SysAlertBitVector
     * @static
     * @param {SysAlertBitVector.$Properties} message SysAlertBitVector message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SysAlertBitVector.encode = function (message, writer, _depth) {
        if (!writer)
            writer = $Writer.create();
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.prevSetVector);
        writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.currVector);
        if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
            for (let i = 0; i < message.$unknowns.length; ++i)
                writer.raw(message.$unknowns[i]);
        return writer;
    };

    /**
     * Encodes the specified SysAlertBitVector message, length delimited. Does not implicitly {@link SysAlertBitVector.verify|verify} messages.
     * @function encodeDelimited
     * @memberof SysAlertBitVector
     * @static
     * @param {SysAlertBitVector.$Properties} message SysAlertBitVector message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SysAlertBitVector.encodeDelimited = function(message, writer) {
        return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
    };

    /**
     * Decodes a SysAlertBitVector message from the specified reader or buffer.
     * @function decode
     * @memberof SysAlertBitVector
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {SysAlertBitVector & SysAlertBitVector.$Shape} SysAlertBitVector
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SysAlertBitVector.decode = function (reader, length, _end, _depth, _target) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $Reader.recursionLimit)
            throw $Error("max depth exceeded");
        let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.SysAlertBitVector();
        while (reader.pos < end) {
            let start = reader.pos;
            let tag = reader.tag();
            if (tag === _end) {
                _end = $undefined;
                break;
            }
            let wireType = tag & 7;
            switch (tag >>>= 3) {
            case 1: {
                    if (wireType !== 0)
                        break;
                    message.prevSetVector = reader.uint32();
                    continue;
                }
            case 2: {
                    if (wireType !== 0)
                        break;
                    message.currVector = reader.uint32();
                    continue;
                }
            }
            reader.skipType(wireType, _depth, tag);
            if (!reader.discardUnknown) {
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
            }
        }
        if (_end !== $undefined)
            throw $Error("missing end group");
        if (!$Object.hasOwnProperty.call(message, "prevSetVector"))
            throw $util.ProtocolError("missing required 'prevSetVector'", { instance: message });
        if (!$Object.hasOwnProperty.call(message, "currVector"))
            throw $util.ProtocolError("missing required 'currVector'", { instance: message });
        return message;
    };

    /**
     * Decodes a SysAlertBitVector message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof SysAlertBitVector
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {SysAlertBitVector & SysAlertBitVector.$Shape} SysAlertBitVector
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SysAlertBitVector.decodeDelimited = function(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a SysAlertBitVector message.
     * @function verify
     * @memberof SysAlertBitVector
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    SysAlertBitVector.verify = function (message, _depth) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            return "max depth exceeded";
        if (!$util.isInteger(message.prevSetVector))
            return "prevSetVector: integer expected";
        if (!$util.isInteger(message.currVector))
            return "currVector: integer expected";
        return null;
    };

    /**
     * Creates a SysAlertBitVector message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof SysAlertBitVector
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {SysAlertBitVector} SysAlertBitVector
     */
    SysAlertBitVector.fromObject = function (object, _depth) {
        if (object instanceof $root.SysAlertBitVector)
            return object;
        if (!$util.isObject(object))
            throw $TypeError(".SysAlertBitVector: object expected");
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        let message = new $root.SysAlertBitVector();
        if (object.prevSetVector != null)
            message.prevSetVector = object.prevSetVector >>> 0;
        if (object.currVector != null)
            message.currVector = object.currVector >>> 0;
        return message;
    };

    /**
     * Creates a plain object from a SysAlertBitVector message. Also converts values to other types if specified.
     * @function toObject
     * @memberof SysAlertBitVector
     * @static
     * @param {SysAlertBitVector} message SysAlertBitVector
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    SysAlertBitVector.toObject = function (message, options, _depth) {
        if (!options)
            options = {};
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        let object = {};
        if (options.defaults) {
            object.prevSetVector = 0;
            object.currVector = 0;
        }
        if (message.prevSetVector != null && $Object.hasOwnProperty.call(message, "prevSetVector"))
            object.prevSetVector = message.prevSetVector;
        if (message.currVector != null && $Object.hasOwnProperty.call(message, "currVector"))
            object.currVector = message.currVector;
        return object;
    };

    /**
     * Converts this SysAlertBitVector to JSON.
     * @function toJSON
     * @memberof SysAlertBitVector
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    SysAlertBitVector.prototype.toJSON = function() {
        return SysAlertBitVector.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the type url for SysAlertBitVector
     * @function getTypeUrl
     * @memberof SysAlertBitVector
     * @static
     * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
     * @returns {string} The type url
     */
    SysAlertBitVector.getTypeUrl = function(prefix) {
        if (prefix === $undefined)
            prefix = "type.googleapis.com";
        return prefix + "/SysAlertBitVector";
    };

    /**
     * Flag enum.
     * @name SysAlertBitVector.Flag
     * @enum {number}
     * @property {number} RESERVED0=0 RESERVED0 value
     * @property {number} HEATING_RATE_UPDATED=1 HEATING_RATE_UPDATED value
     * @property {number} COOKING_STARTED=2 COOKING_STARTED value
     * @property {number} SET_POINT_REACHED=4 SET_POINT_REACHED value
     * @property {number} EVENT_LOG_FULL=8 EVENT_LOG_FULL value
     * @property {number} WATER_LEAK=16 WATER_LEAK value
     * @property {number} WATER_LOW=32 WATER_LOW value
     * @property {number} MOTOR_STUCK=64 MOTOR_STUCK value
     * @property {number} HEATER_OVER_TEMP=128 HEATER_OVER_TEMP value
     * @property {number} TRIAC_OVER_TEMP=256 TRIAC_OVER_TEMP value
     * @property {number} COOKING_TIMER_STARTED=512 COOKING_TIMER_STARTED value
     * @property {number} SETPOINT_CHANGED=1024 SETPOINT_CHANGED value
     * @property {number} UNITS_CHANGED=2048 UNITS_CHANGED value
     * @property {number} RESET=4096 RESET value
     * @property {number} COOKING_TIMER_EXPIRED=8192 COOKING_TIMER_EXPIRED value
     * @property {number} DELTA_TEMP=16384 DELTA_TEMP value
     */
    SysAlertBitVector.Flag = (function() {
        const valuesById = $Object.create(null), values = $Object.create(valuesById);
        values[valuesById[0] = "RESERVED0"] = 0;
        values[valuesById[1] = "HEATING_RATE_UPDATED"] = 1;
        values[valuesById[2] = "COOKING_STARTED"] = 2;
        values[valuesById[4] = "SET_POINT_REACHED"] = 4;
        values[valuesById[8] = "EVENT_LOG_FULL"] = 8;
        values[valuesById[16] = "WATER_LEAK"] = 16;
        values[valuesById[32] = "WATER_LOW"] = 32;
        values[valuesById[64] = "MOTOR_STUCK"] = 64;
        values[valuesById[128] = "HEATER_OVER_TEMP"] = 128;
        values[valuesById[256] = "TRIAC_OVER_TEMP"] = 256;
        values[valuesById[512] = "COOKING_TIMER_STARTED"] = 512;
        values[valuesById[1024] = "SETPOINT_CHANGED"] = 1024;
        values[valuesById[2048] = "UNITS_CHANGED"] = 2048;
        values[valuesById[4096] = "RESET"] = 4096;
        values[valuesById[8192] = "COOKING_TIMER_EXPIRED"] = 8192;
        values[valuesById[16384] = "DELTA_TEMP"] = 16384;
        return values;
    })();

    return SysAlertBitVector;
})();

export const BleConnectionParams = $root.BleConnectionParams = (() => {

    /**
     * Properties of a BleConnectionParams.
     * @typedef {Object} BleConnectionParams.$Properties
     * @property {number} slaveLatencyMs BleConnectionParams slaveLatencyMs
     * @property {number} connectionIntervalMinMs BleConnectionParams connectionIntervalMinMs
     * @property {number} connectionIntervalMaxMs BleConnectionParams connectionIntervalMaxMs
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
     */

    /**
     * Properties of a BleConnectionParams.
     * @exports IBleConnectionParams
     * @interface IBleConnectionParams
     * @augments BleConnectionParams.$Properties
     * @deprecated Use BleConnectionParams.$Properties instead.
     */

    /**
     * Shape of a BleConnectionParams.
     * @typedef {BleConnectionParams.$Properties} BleConnectionParams.$Shape
     */

    /**
     * Constructs a new BleConnectionParams.
     * @exports BleConnectionParams
     * @classdesc Represents a BleConnectionParams.
     * @constructor
     * @param {BleConnectionParams.$Properties=} [properties] Properties to set
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
     */
    const BleConnectionParams = function (properties) {
        if (properties)
            for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                    this[keys[i]] = properties[keys[i]];
    };

    /**
     * BleConnectionParams slaveLatencyMs.
     * @member {number} slaveLatencyMs
     * @memberof BleConnectionParams
     * @instance
     */
    BleConnectionParams.prototype.slaveLatencyMs = 0;

    /**
     * BleConnectionParams connectionIntervalMinMs.
     * @member {number} connectionIntervalMinMs
     * @memberof BleConnectionParams
     * @instance
     */
    BleConnectionParams.prototype.connectionIntervalMinMs = 0;

    /**
     * BleConnectionParams connectionIntervalMaxMs.
     * @member {number} connectionIntervalMaxMs
     * @memberof BleConnectionParams
     * @instance
     */
    BleConnectionParams.prototype.connectionIntervalMaxMs = 0;

    /**
     * Creates a new BleConnectionParams instance using the specified properties.
     * @function create
     * @memberof BleConnectionParams
     * @static
     * @param {BleConnectionParams.$Properties=} [properties] Properties to set
     * @returns {BleConnectionParams} BleConnectionParams instance
     * @type {{
     *   (properties: BleConnectionParams.$Shape): BleConnectionParams & BleConnectionParams.$Shape;
     *   (properties?: BleConnectionParams.$Properties): BleConnectionParams;
     * }}
     */
    BleConnectionParams.create = function(properties) {
        return new BleConnectionParams(properties);
    };

    /**
     * Encodes the specified BleConnectionParams message. Does not implicitly {@link BleConnectionParams.verify|verify} messages.
     * @function encode
     * @memberof BleConnectionParams
     * @static
     * @param {BleConnectionParams.$Properties} message BleConnectionParams message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    BleConnectionParams.encode = function (message, writer, _depth) {
        if (!writer)
            writer = $Writer.create();
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.slaveLatencyMs);
        writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.connectionIntervalMinMs);
        writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.connectionIntervalMaxMs);
        if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
            for (let i = 0; i < message.$unknowns.length; ++i)
                writer.raw(message.$unknowns[i]);
        return writer;
    };

    /**
     * Encodes the specified BleConnectionParams message, length delimited. Does not implicitly {@link BleConnectionParams.verify|verify} messages.
     * @function encodeDelimited
     * @memberof BleConnectionParams
     * @static
     * @param {BleConnectionParams.$Properties} message BleConnectionParams message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    BleConnectionParams.encodeDelimited = function(message, writer) {
        return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
    };

    /**
     * Decodes a BleConnectionParams message from the specified reader or buffer.
     * @function decode
     * @memberof BleConnectionParams
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {BleConnectionParams & BleConnectionParams.$Shape} BleConnectionParams
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    BleConnectionParams.decode = function (reader, length, _end, _depth, _target) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $Reader.recursionLimit)
            throw $Error("max depth exceeded");
        let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.BleConnectionParams();
        while (reader.pos < end) {
            let start = reader.pos;
            let tag = reader.tag();
            if (tag === _end) {
                _end = $undefined;
                break;
            }
            let wireType = tag & 7;
            switch (tag >>>= 3) {
            case 1: {
                    if (wireType !== 0)
                        break;
                    message.slaveLatencyMs = reader.uint32();
                    continue;
                }
            case 2: {
                    if (wireType !== 0)
                        break;
                    message.connectionIntervalMinMs = reader.uint32();
                    continue;
                }
            case 3: {
                    if (wireType !== 0)
                        break;
                    message.connectionIntervalMaxMs = reader.uint32();
                    continue;
                }
            }
            reader.skipType(wireType, _depth, tag);
            if (!reader.discardUnknown) {
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
            }
        }
        if (_end !== $undefined)
            throw $Error("missing end group");
        if (!$Object.hasOwnProperty.call(message, "slaveLatencyMs"))
            throw $util.ProtocolError("missing required 'slaveLatencyMs'", { instance: message });
        if (!$Object.hasOwnProperty.call(message, "connectionIntervalMinMs"))
            throw $util.ProtocolError("missing required 'connectionIntervalMinMs'", { instance: message });
        if (!$Object.hasOwnProperty.call(message, "connectionIntervalMaxMs"))
            throw $util.ProtocolError("missing required 'connectionIntervalMaxMs'", { instance: message });
        return message;
    };

    /**
     * Decodes a BleConnectionParams message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof BleConnectionParams
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {BleConnectionParams & BleConnectionParams.$Shape} BleConnectionParams
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    BleConnectionParams.decodeDelimited = function(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a BleConnectionParams message.
     * @function verify
     * @memberof BleConnectionParams
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    BleConnectionParams.verify = function (message, _depth) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            return "max depth exceeded";
        if (!$util.isInteger(message.slaveLatencyMs))
            return "slaveLatencyMs: integer expected";
        if (!$util.isInteger(message.connectionIntervalMinMs))
            return "connectionIntervalMinMs: integer expected";
        if (!$util.isInteger(message.connectionIntervalMaxMs))
            return "connectionIntervalMaxMs: integer expected";
        return null;
    };

    /**
     * Creates a BleConnectionParams message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof BleConnectionParams
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {BleConnectionParams} BleConnectionParams
     */
    BleConnectionParams.fromObject = function (object, _depth) {
        if (object instanceof $root.BleConnectionParams)
            return object;
        if (!$util.isObject(object))
            throw $TypeError(".BleConnectionParams: object expected");
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        let message = new $root.BleConnectionParams();
        if (object.slaveLatencyMs != null)
            message.slaveLatencyMs = object.slaveLatencyMs >>> 0;
        if (object.connectionIntervalMinMs != null)
            message.connectionIntervalMinMs = object.connectionIntervalMinMs >>> 0;
        if (object.connectionIntervalMaxMs != null)
            message.connectionIntervalMaxMs = object.connectionIntervalMaxMs >>> 0;
        return message;
    };

    /**
     * Creates a plain object from a BleConnectionParams message. Also converts values to other types if specified.
     * @function toObject
     * @memberof BleConnectionParams
     * @static
     * @param {BleConnectionParams} message BleConnectionParams
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    BleConnectionParams.toObject = function (message, options, _depth) {
        if (!options)
            options = {};
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        let object = {};
        if (options.defaults) {
            object.slaveLatencyMs = 0;
            object.connectionIntervalMinMs = 0;
            object.connectionIntervalMaxMs = 0;
        }
        if (message.slaveLatencyMs != null && $Object.hasOwnProperty.call(message, "slaveLatencyMs"))
            object.slaveLatencyMs = message.slaveLatencyMs;
        if (message.connectionIntervalMinMs != null && $Object.hasOwnProperty.call(message, "connectionIntervalMinMs"))
            object.connectionIntervalMinMs = message.connectionIntervalMinMs;
        if (message.connectionIntervalMaxMs != null && $Object.hasOwnProperty.call(message, "connectionIntervalMaxMs"))
            object.connectionIntervalMaxMs = message.connectionIntervalMaxMs;
        return object;
    };

    /**
     * Converts this BleConnectionParams to JSON.
     * @function toJSON
     * @memberof BleConnectionParams
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    BleConnectionParams.prototype.toJSON = function() {
        return BleConnectionParams.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the type url for BleConnectionParams
     * @function getTypeUrl
     * @memberof BleConnectionParams
     * @static
     * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
     * @returns {string} The type url
     */
    BleConnectionParams.getTypeUrl = function(prefix) {
        if (prefix === $undefined)
            prefix = "type.googleapis.com";
        return prefix + "/BleConnectionParams";
    };

    return BleConnectionParams;
})();

export const DeviceInfo = $root.DeviceInfo = (() => {

    /**
     * Properties of a DeviceInfo.
     * @typedef {Object} DeviceInfo.$Properties
     * @property {number} revision DeviceInfo revision
     * @property {number} modelNumber DeviceInfo modelNumber
     * @property {number} boardRevision DeviceInfo boardRevision
     * @property {number} bom DeviceInfo bom
     * @property {number} platform DeviceInfo platform
     * @property {number} cmCode DeviceInfo cmCode
     * @property {number} dateCode DeviceInfo dateCode
     * @property {string} serialNumber DeviceInfo serialNumber
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
     */

    /**
     * Properties of a DeviceInfo.
     * @exports IDeviceInfo
     * @interface IDeviceInfo
     * @augments DeviceInfo.$Properties
     * @deprecated Use DeviceInfo.$Properties instead.
     */

    /**
     * Shape of a DeviceInfo.
     * @typedef {DeviceInfo.$Properties} DeviceInfo.$Shape
     */

    /**
     * Constructs a new DeviceInfo.
     * @exports DeviceInfo
     * @classdesc Represents a DeviceInfo.
     * @constructor
     * @param {DeviceInfo.$Properties=} [properties] Properties to set
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
     */
    const DeviceInfo = function (properties) {
        if (properties)
            for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                    this[keys[i]] = properties[keys[i]];
    };

    /**
     * DeviceInfo revision.
     * @member {number} revision
     * @memberof DeviceInfo
     * @instance
     */
    DeviceInfo.prototype.revision = 0;

    /**
     * DeviceInfo modelNumber.
     * @member {number} modelNumber
     * @memberof DeviceInfo
     * @instance
     */
    DeviceInfo.prototype.modelNumber = 0;

    /**
     * DeviceInfo boardRevision.
     * @member {number} boardRevision
     * @memberof DeviceInfo
     * @instance
     */
    DeviceInfo.prototype.boardRevision = 0;

    /**
     * DeviceInfo bom.
     * @member {number} bom
     * @memberof DeviceInfo
     * @instance
     */
    DeviceInfo.prototype.bom = 0;

    /**
     * DeviceInfo platform.
     * @member {number} platform
     * @memberof DeviceInfo
     * @instance
     */
    DeviceInfo.prototype.platform = 0;

    /**
     * DeviceInfo cmCode.
     * @member {number} cmCode
     * @memberof DeviceInfo
     * @instance
     */
    DeviceInfo.prototype.cmCode = 0;

    /**
     * DeviceInfo dateCode.
     * @member {number} dateCode
     * @memberof DeviceInfo
     * @instance
     */
    DeviceInfo.prototype.dateCode = 0;

    /**
     * DeviceInfo serialNumber.
     * @member {string} serialNumber
     * @memberof DeviceInfo
     * @instance
     */
    DeviceInfo.prototype.serialNumber = "";

    /**
     * Creates a new DeviceInfo instance using the specified properties.
     * @function create
     * @memberof DeviceInfo
     * @static
     * @param {DeviceInfo.$Properties=} [properties] Properties to set
     * @returns {DeviceInfo} DeviceInfo instance
     * @type {{
     *   (properties: DeviceInfo.$Shape): DeviceInfo & DeviceInfo.$Shape;
     *   (properties?: DeviceInfo.$Properties): DeviceInfo;
     * }}
     */
    DeviceInfo.create = function(properties) {
        return new DeviceInfo(properties);
    };

    /**
     * Encodes the specified DeviceInfo message. Does not implicitly {@link DeviceInfo.verify|verify} messages.
     * @function encode
     * @memberof DeviceInfo
     * @static
     * @param {DeviceInfo.$Properties} message DeviceInfo message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DeviceInfo.encode = function (message, writer, _depth) {
        if (!writer)
            writer = $Writer.create();
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.revision);
        writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.modelNumber);
        writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.boardRevision);
        writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.bom);
        writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.platform);
        writer.uint32(/* id 6, wireType 0 =*/48).uint32(message.cmCode);
        writer.uint32(/* id 7, wireType 0 =*/56).uint32(message.dateCode);
        writer.uint32(/* id 8, wireType 2 =*/66).string(message.serialNumber);
        if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
            for (let i = 0; i < message.$unknowns.length; ++i)
                writer.raw(message.$unknowns[i]);
        return writer;
    };

    /**
     * Encodes the specified DeviceInfo message, length delimited. Does not implicitly {@link DeviceInfo.verify|verify} messages.
     * @function encodeDelimited
     * @memberof DeviceInfo
     * @static
     * @param {DeviceInfo.$Properties} message DeviceInfo message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DeviceInfo.encodeDelimited = function(message, writer) {
        return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
    };

    /**
     * Decodes a DeviceInfo message from the specified reader or buffer.
     * @function decode
     * @memberof DeviceInfo
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {DeviceInfo & DeviceInfo.$Shape} DeviceInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DeviceInfo.decode = function (reader, length, _end, _depth, _target) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $Reader.recursionLimit)
            throw $Error("max depth exceeded");
        let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.DeviceInfo();
        while (reader.pos < end) {
            let start = reader.pos;
            let tag = reader.tag();
            if (tag === _end) {
                _end = $undefined;
                break;
            }
            let wireType = tag & 7;
            switch (tag >>>= 3) {
            case 1: {
                    if (wireType !== 0)
                        break;
                    message.revision = reader.uint32();
                    continue;
                }
            case 2: {
                    if (wireType !== 0)
                        break;
                    message.modelNumber = reader.uint32();
                    continue;
                }
            case 3: {
                    if (wireType !== 0)
                        break;
                    message.boardRevision = reader.uint32();
                    continue;
                }
            case 4: {
                    if (wireType !== 0)
                        break;
                    message.bom = reader.uint32();
                    continue;
                }
            case 5: {
                    if (wireType !== 0)
                        break;
                    message.platform = reader.uint32();
                    continue;
                }
            case 6: {
                    if (wireType !== 0)
                        break;
                    message.cmCode = reader.uint32();
                    continue;
                }
            case 7: {
                    if (wireType !== 0)
                        break;
                    message.dateCode = reader.uint32();
                    continue;
                }
            case 8: {
                    if (wireType !== 2)
                        break;
                    message.serialNumber = reader.string();
                    continue;
                }
            }
            reader.skipType(wireType, _depth, tag);
            if (!reader.discardUnknown) {
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
            }
        }
        if (_end !== $undefined)
            throw $Error("missing end group");
        if (!$Object.hasOwnProperty.call(message, "revision"))
            throw $util.ProtocolError("missing required 'revision'", { instance: message });
        if (!$Object.hasOwnProperty.call(message, "modelNumber"))
            throw $util.ProtocolError("missing required 'modelNumber'", { instance: message });
        if (!$Object.hasOwnProperty.call(message, "boardRevision"))
            throw $util.ProtocolError("missing required 'boardRevision'", { instance: message });
        if (!$Object.hasOwnProperty.call(message, "bom"))
            throw $util.ProtocolError("missing required 'bom'", { instance: message });
        if (!$Object.hasOwnProperty.call(message, "platform"))
            throw $util.ProtocolError("missing required 'platform'", { instance: message });
        if (!$Object.hasOwnProperty.call(message, "cmCode"))
            throw $util.ProtocolError("missing required 'cmCode'", { instance: message });
        if (!$Object.hasOwnProperty.call(message, "dateCode"))
            throw $util.ProtocolError("missing required 'dateCode'", { instance: message });
        if (!$Object.hasOwnProperty.call(message, "serialNumber"))
            throw $util.ProtocolError("missing required 'serialNumber'", { instance: message });
        return message;
    };

    /**
     * Decodes a DeviceInfo message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof DeviceInfo
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {DeviceInfo & DeviceInfo.$Shape} DeviceInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DeviceInfo.decodeDelimited = function(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a DeviceInfo message.
     * @function verify
     * @memberof DeviceInfo
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    DeviceInfo.verify = function (message, _depth) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            return "max depth exceeded";
        if (!$util.isInteger(message.revision))
            return "revision: integer expected";
        if (!$util.isInteger(message.modelNumber))
            return "modelNumber: integer expected";
        if (!$util.isInteger(message.boardRevision))
            return "boardRevision: integer expected";
        if (!$util.isInteger(message.bom))
            return "bom: integer expected";
        if (!$util.isInteger(message.platform))
            return "platform: integer expected";
        if (!$util.isInteger(message.cmCode))
            return "cmCode: integer expected";
        if (!$util.isInteger(message.dateCode))
            return "dateCode: integer expected";
        if (!$util.isString(message.serialNumber))
            return "serialNumber: string expected";
        return null;
    };

    /**
     * Creates a DeviceInfo message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof DeviceInfo
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {DeviceInfo} DeviceInfo
     */
    DeviceInfo.fromObject = function (object, _depth) {
        if (object instanceof $root.DeviceInfo)
            return object;
        if (!$util.isObject(object))
            throw $TypeError(".DeviceInfo: object expected");
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        let message = new $root.DeviceInfo();
        if (object.revision != null)
            message.revision = object.revision >>> 0;
        if (object.modelNumber != null)
            message.modelNumber = object.modelNumber >>> 0;
        if (object.boardRevision != null)
            message.boardRevision = object.boardRevision >>> 0;
        if (object.bom != null)
            message.bom = object.bom >>> 0;
        if (object.platform != null)
            message.platform = object.platform >>> 0;
        if (object.cmCode != null)
            message.cmCode = object.cmCode >>> 0;
        if (object.dateCode != null)
            message.dateCode = object.dateCode >>> 0;
        if (object.serialNumber != null)
            message.serialNumber = $String(object.serialNumber);
        return message;
    };

    /**
     * Creates a plain object from a DeviceInfo message. Also converts values to other types if specified.
     * @function toObject
     * @memberof DeviceInfo
     * @static
     * @param {DeviceInfo} message DeviceInfo
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    DeviceInfo.toObject = function (message, options, _depth) {
        if (!options)
            options = {};
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        let object = {};
        if (options.defaults) {
            object.revision = 0;
            object.modelNumber = 0;
            object.boardRevision = 0;
            object.bom = 0;
            object.platform = 0;
            object.cmCode = 0;
            object.dateCode = 0;
            object.serialNumber = "";
        }
        if (message.revision != null && $Object.hasOwnProperty.call(message, "revision"))
            object.revision = message.revision;
        if (message.modelNumber != null && $Object.hasOwnProperty.call(message, "modelNumber"))
            object.modelNumber = message.modelNumber;
        if (message.boardRevision != null && $Object.hasOwnProperty.call(message, "boardRevision"))
            object.boardRevision = message.boardRevision;
        if (message.bom != null && $Object.hasOwnProperty.call(message, "bom"))
            object.bom = message.bom;
        if (message.platform != null && $Object.hasOwnProperty.call(message, "platform"))
            object.platform = message.platform;
        if (message.cmCode != null && $Object.hasOwnProperty.call(message, "cmCode"))
            object.cmCode = message.cmCode;
        if (message.dateCode != null && $Object.hasOwnProperty.call(message, "dateCode"))
            object.dateCode = message.dateCode;
        if (message.serialNumber != null && $Object.hasOwnProperty.call(message, "serialNumber"))
            object.serialNumber = message.serialNumber;
        return object;
    };

    /**
     * Converts this DeviceInfo to JSON.
     * @function toJSON
     * @memberof DeviceInfo
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    DeviceInfo.prototype.toJSON = function() {
        return DeviceInfo.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the type url for DeviceInfo
     * @function getTypeUrl
     * @memberof DeviceInfo
     * @static
     * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
     * @returns {string} The type url
     */
    DeviceInfo.getTypeUrl = function(prefix) {
        if (prefix === $undefined)
            prefix = "type.googleapis.com";
        return prefix + "/DeviceInfo";
    };

    return DeviceInfo;
})();

export const FirmwareInfo = $root.FirmwareInfo = (() => {

    /**
     * Properties of a FirmwareInfo.
     * @typedef {Object} FirmwareInfo.$Properties
     * @property {string} commitId FirmwareInfo commitId
     * @property {string} tagId FirmwareInfo tagId
     * @property {number} dateCode FirmwareInfo dateCode
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
     */

    /**
     * Properties of a FirmwareInfo.
     * @exports IFirmwareInfo
     * @interface IFirmwareInfo
     * @augments FirmwareInfo.$Properties
     * @deprecated Use FirmwareInfo.$Properties instead.
     */

    /**
     * Shape of a FirmwareInfo.
     * @typedef {FirmwareInfo.$Properties} FirmwareInfo.$Shape
     */

    /**
     * Constructs a new FirmwareInfo.
     * @exports FirmwareInfo
     * @classdesc Represents a FirmwareInfo.
     * @constructor
     * @param {FirmwareInfo.$Properties=} [properties] Properties to set
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
     */
    const FirmwareInfo = function (properties) {
        if (properties)
            for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                    this[keys[i]] = properties[keys[i]];
    };

    /**
     * FirmwareInfo commitId.
     * @member {string} commitId
     * @memberof FirmwareInfo
     * @instance
     */
    FirmwareInfo.prototype.commitId = "";

    /**
     * FirmwareInfo tagId.
     * @member {string} tagId
     * @memberof FirmwareInfo
     * @instance
     */
    FirmwareInfo.prototype.tagId = "";

    /**
     * FirmwareInfo dateCode.
     * @member {number} dateCode
     * @memberof FirmwareInfo
     * @instance
     */
    FirmwareInfo.prototype.dateCode = 0;

    /**
     * Creates a new FirmwareInfo instance using the specified properties.
     * @function create
     * @memberof FirmwareInfo
     * @static
     * @param {FirmwareInfo.$Properties=} [properties] Properties to set
     * @returns {FirmwareInfo} FirmwareInfo instance
     * @type {{
     *   (properties: FirmwareInfo.$Shape): FirmwareInfo & FirmwareInfo.$Shape;
     *   (properties?: FirmwareInfo.$Properties): FirmwareInfo;
     * }}
     */
    FirmwareInfo.create = function(properties) {
        return new FirmwareInfo(properties);
    };

    /**
     * Encodes the specified FirmwareInfo message. Does not implicitly {@link FirmwareInfo.verify|verify} messages.
     * @function encode
     * @memberof FirmwareInfo
     * @static
     * @param {FirmwareInfo.$Properties} message FirmwareInfo message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    FirmwareInfo.encode = function (message, writer, _depth) {
        if (!writer)
            writer = $Writer.create();
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        writer.uint32(/* id 1, wireType 2 =*/10).string(message.commitId);
        writer.uint32(/* id 2, wireType 2 =*/18).string(message.tagId);
        writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.dateCode);
        if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
            for (let i = 0; i < message.$unknowns.length; ++i)
                writer.raw(message.$unknowns[i]);
        return writer;
    };

    /**
     * Encodes the specified FirmwareInfo message, length delimited. Does not implicitly {@link FirmwareInfo.verify|verify} messages.
     * @function encodeDelimited
     * @memberof FirmwareInfo
     * @static
     * @param {FirmwareInfo.$Properties} message FirmwareInfo message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    FirmwareInfo.encodeDelimited = function(message, writer) {
        return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
    };

    /**
     * Decodes a FirmwareInfo message from the specified reader or buffer.
     * @function decode
     * @memberof FirmwareInfo
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {FirmwareInfo & FirmwareInfo.$Shape} FirmwareInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    FirmwareInfo.decode = function (reader, length, _end, _depth, _target) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $Reader.recursionLimit)
            throw $Error("max depth exceeded");
        let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.FirmwareInfo();
        while (reader.pos < end) {
            let start = reader.pos;
            let tag = reader.tag();
            if (tag === _end) {
                _end = $undefined;
                break;
            }
            let wireType = tag & 7;
            switch (tag >>>= 3) {
            case 1: {
                    if (wireType !== 2)
                        break;
                    message.commitId = reader.string();
                    continue;
                }
            case 2: {
                    if (wireType !== 2)
                        break;
                    message.tagId = reader.string();
                    continue;
                }
            case 3: {
                    if (wireType !== 0)
                        break;
                    message.dateCode = reader.uint32();
                    continue;
                }
            }
            reader.skipType(wireType, _depth, tag);
            if (!reader.discardUnknown) {
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
            }
        }
        if (_end !== $undefined)
            throw $Error("missing end group");
        if (!$Object.hasOwnProperty.call(message, "commitId"))
            throw $util.ProtocolError("missing required 'commitId'", { instance: message });
        if (!$Object.hasOwnProperty.call(message, "tagId"))
            throw $util.ProtocolError("missing required 'tagId'", { instance: message });
        if (!$Object.hasOwnProperty.call(message, "dateCode"))
            throw $util.ProtocolError("missing required 'dateCode'", { instance: message });
        return message;
    };

    /**
     * Decodes a FirmwareInfo message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof FirmwareInfo
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {FirmwareInfo & FirmwareInfo.$Shape} FirmwareInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    FirmwareInfo.decodeDelimited = function(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a FirmwareInfo message.
     * @function verify
     * @memberof FirmwareInfo
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    FirmwareInfo.verify = function (message, _depth) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            return "max depth exceeded";
        if (!$util.isString(message.commitId))
            return "commitId: string expected";
        if (!$util.isString(message.tagId))
            return "tagId: string expected";
        if (!$util.isInteger(message.dateCode))
            return "dateCode: integer expected";
        return null;
    };

    /**
     * Creates a FirmwareInfo message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof FirmwareInfo
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {FirmwareInfo} FirmwareInfo
     */
    FirmwareInfo.fromObject = function (object, _depth) {
        if (object instanceof $root.FirmwareInfo)
            return object;
        if (!$util.isObject(object))
            throw $TypeError(".FirmwareInfo: object expected");
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        let message = new $root.FirmwareInfo();
        if (object.commitId != null)
            message.commitId = $String(object.commitId);
        if (object.tagId != null)
            message.tagId = $String(object.tagId);
        if (object.dateCode != null)
            message.dateCode = object.dateCode >>> 0;
        return message;
    };

    /**
     * Creates a plain object from a FirmwareInfo message. Also converts values to other types if specified.
     * @function toObject
     * @memberof FirmwareInfo
     * @static
     * @param {FirmwareInfo} message FirmwareInfo
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    FirmwareInfo.toObject = function (message, options, _depth) {
        if (!options)
            options = {};
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        let object = {};
        if (options.defaults) {
            object.commitId = "";
            object.tagId = "";
            object.dateCode = 0;
        }
        if (message.commitId != null && $Object.hasOwnProperty.call(message, "commitId"))
            object.commitId = message.commitId;
        if (message.tagId != null && $Object.hasOwnProperty.call(message, "tagId"))
            object.tagId = message.tagId;
        if (message.dateCode != null && $Object.hasOwnProperty.call(message, "dateCode"))
            object.dateCode = message.dateCode;
        return object;
    };

    /**
     * Converts this FirmwareInfo to JSON.
     * @function toJSON
     * @memberof FirmwareInfo
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    FirmwareInfo.prototype.toJSON = function() {
        return FirmwareInfo.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the type url for FirmwareInfo
     * @function getTypeUrl
     * @memberof FirmwareInfo
     * @static
     * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
     * @returns {string} The type url
     */
    FirmwareInfo.getTypeUrl = function(prefix) {
        if (prefix === $undefined)
            prefix = "type.googleapis.com";
        return prefix + "/FirmwareInfo";
    };

    return FirmwareInfo;
})();

export const DeviceState = $root.DeviceState = (() => {

    /**
     * Properties of a DeviceState.
     * @typedef {Object} DeviceState.$Properties
     * @property {SensorValue.$Properties} waterTemp DeviceState waterTemp
     * @property {SysAlertBitVector.$Properties} alerts DeviceState alerts
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
     */

    /**
     * Properties of a DeviceState.
     * @exports IDeviceState
     * @interface IDeviceState
     * @augments DeviceState.$Properties
     * @deprecated Use DeviceState.$Properties instead.
     */

    /**
     * Shape of a DeviceState.
     * @typedef {DeviceState.$Properties} DeviceState.$Shape
     */

    /**
     * Constructs a new DeviceState.
     * @exports DeviceState
     * @classdesc Represents a DeviceState.
     * @constructor
     * @param {DeviceState.$Properties=} [properties] Properties to set
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
     */
    const DeviceState = function (properties) {
        if (properties)
            for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                    this[keys[i]] = properties[keys[i]];
    };

    /**
     * DeviceState waterTemp.
     * @member {SensorValue.$Properties} waterTemp
     * @memberof DeviceState
     * @instance
     */
    DeviceState.prototype.waterTemp = null;

    /**
     * DeviceState alerts.
     * @member {SysAlertBitVector.$Properties} alerts
     * @memberof DeviceState
     * @instance
     */
    DeviceState.prototype.alerts = null;

    /**
     * Creates a new DeviceState instance using the specified properties.
     * @function create
     * @memberof DeviceState
     * @static
     * @param {DeviceState.$Properties=} [properties] Properties to set
     * @returns {DeviceState} DeviceState instance
     * @type {{
     *   (properties: DeviceState.$Shape): DeviceState & DeviceState.$Shape;
     *   (properties?: DeviceState.$Properties): DeviceState;
     * }}
     */
    DeviceState.create = function(properties) {
        return new DeviceState(properties);
    };

    /**
     * Encodes the specified DeviceState message. Does not implicitly {@link DeviceState.verify|verify} messages.
     * @function encode
     * @memberof DeviceState
     * @static
     * @param {DeviceState.$Properties} message DeviceState message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DeviceState.encode = function (message, writer, _depth) {
        if (!writer)
            writer = $Writer.create();
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        $root.SensorValue.encode(message.waterTemp, writer.uint32(/* id 1, wireType 2 =*/10).fork(), _depth + 1).ldelim();
        $root.SysAlertBitVector.encode(message.alerts, writer.uint32(/* id 2, wireType 2 =*/18).fork(), _depth + 1).ldelim();
        if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
            for (let i = 0; i < message.$unknowns.length; ++i)
                writer.raw(message.$unknowns[i]);
        return writer;
    };

    /**
     * Encodes the specified DeviceState message, length delimited. Does not implicitly {@link DeviceState.verify|verify} messages.
     * @function encodeDelimited
     * @memberof DeviceState
     * @static
     * @param {DeviceState.$Properties} message DeviceState message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DeviceState.encodeDelimited = function(message, writer) {
        return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
    };

    /**
     * Decodes a DeviceState message from the specified reader or buffer.
     * @function decode
     * @memberof DeviceState
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {DeviceState & DeviceState.$Shape} DeviceState
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DeviceState.decode = function (reader, length, _end, _depth, _target) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $Reader.recursionLimit)
            throw $Error("max depth exceeded");
        let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.DeviceState();
        while (reader.pos < end) {
            let start = reader.pos;
            let tag = reader.tag();
            if (tag === _end) {
                _end = $undefined;
                break;
            }
            let wireType = tag & 7;
            switch (tag >>>= 3) {
            case 1: {
                    if (wireType !== 2)
                        break;
                    message.waterTemp = $root.SensorValue.decode(reader, reader.uint32(), $undefined, _depth + 1, message.waterTemp);
                    continue;
                }
            case 2: {
                    if (wireType !== 2)
                        break;
                    message.alerts = $root.SysAlertBitVector.decode(reader, reader.uint32(), $undefined, _depth + 1, message.alerts);
                    continue;
                }
            }
            reader.skipType(wireType, _depth, tag);
            if (!reader.discardUnknown) {
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
            }
        }
        if (_end !== $undefined)
            throw $Error("missing end group");
        if (!$Object.hasOwnProperty.call(message, "waterTemp"))
            throw $util.ProtocolError("missing required 'waterTemp'", { instance: message });
        if (!$Object.hasOwnProperty.call(message, "alerts"))
            throw $util.ProtocolError("missing required 'alerts'", { instance: message });
        return message;
    };

    /**
     * Decodes a DeviceState message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof DeviceState
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {DeviceState & DeviceState.$Shape} DeviceState
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DeviceState.decodeDelimited = function(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a DeviceState message.
     * @function verify
     * @memberof DeviceState
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    DeviceState.verify = function (message, _depth) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            return "max depth exceeded";
        {
            let error = $root.SensorValue.verify(message.waterTemp, _depth + 1);
            if (error)
                return "waterTemp." + error;
        }
        {
            let error = $root.SysAlertBitVector.verify(message.alerts, _depth + 1);
            if (error)
                return "alerts." + error;
        }
        return null;
    };

    /**
     * Creates a DeviceState message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof DeviceState
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {DeviceState} DeviceState
     */
    DeviceState.fromObject = function (object, _depth) {
        if (object instanceof $root.DeviceState)
            return object;
        if (!$util.isObject(object))
            throw $TypeError(".DeviceState: object expected");
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        let message = new $root.DeviceState();
        if (object.waterTemp != null) {
            if (!$util.isObject(object.waterTemp))
                throw $TypeError(".DeviceState.waterTemp: object expected");
            message.waterTemp = $root.SensorValue.fromObject(object.waterTemp, _depth + 1);
        }
        if (object.alerts != null) {
            if (!$util.isObject(object.alerts))
                throw $TypeError(".DeviceState.alerts: object expected");
            message.alerts = $root.SysAlertBitVector.fromObject(object.alerts, _depth + 1);
        }
        return message;
    };

    /**
     * Creates a plain object from a DeviceState message. Also converts values to other types if specified.
     * @function toObject
     * @memberof DeviceState
     * @static
     * @param {DeviceState} message DeviceState
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    DeviceState.toObject = function (message, options, _depth) {
        if (!options)
            options = {};
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        let object = {};
        if (options.defaults) {
            object.waterTemp = null;
            object.alerts = null;
        }
        if (message.waterTemp != null && $Object.hasOwnProperty.call(message, "waterTemp"))
            object.waterTemp = $root.SensorValue.toObject(message.waterTemp, options, _depth + 1);
        if (message.alerts != null && $Object.hasOwnProperty.call(message, "alerts"))
            object.alerts = $root.SysAlertBitVector.toObject(message.alerts, options, _depth + 1);
        return object;
    };

    /**
     * Converts this DeviceState to JSON.
     * @function toJSON
     * @memberof DeviceState
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    DeviceState.prototype.toJSON = function() {
        return DeviceState.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the type url for DeviceState
     * @function getTypeUrl
     * @memberof DeviceState
     * @static
     * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
     * @returns {string} The type url
     */
    DeviceState.getTypeUrl = function(prefix) {
        if (prefix === $undefined)
            prefix = "type.googleapis.com";
        return prefix + "/DeviceState";
    };

    return DeviceState;
})();

export {
  $root as default
};
