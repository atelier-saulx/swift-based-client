var Based = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
  };

  // node_modules/@based/client/dist/src/index.js
  var src_exports = {};
  __export(src_exports, {
    BasedClient: () => BasedClient,
    BasedClientQuery: () => BasedClientQuery,
    cacheId: () => cacheId,
    decodeAuthState: () => decodeAuthState,
    default: () => based,
    encodeAuthState: () => encodeAuthState
  });

  // node_modules/@based/client/dist/src/websocket/urlLoader.js
  var urlLoader_default = /* @__PURE__ */ __name((url, cb) => {
    if (typeof url === "function") {
      url().then((v) => {
        cb(v);
      });
    } else {
      cb(url);
    }
  }, "default");

  // node_modules/@based/utils/dist/src/deepEqual.js
  var deepEqual = /* @__PURE__ */ __name((a2, b2) => {
    const typeA = typeof a2;
    const typeB = typeof b2;
    if (a2 === b2)
      return true;
    if (typeA !== typeB)
      return false;
    if (a2 === null || b2 === null)
      return false;
    if (typeA !== "object") {
      if (typeA === "function") {
        if (a2.toString() !== b2.toString()) {
          return false;
        }
      } else if (a2 !== b2) {
        return false;
      }
    } else {
      if (Array.isArray(a2)) {
        if (Array.isArray(b2)) {
          const len = a2.length;
          if (len !== b2.length) {
            return false;
          }
          for (let i2 = 0; i2 < len; i2++) {
            const t = typeof a2[i2];
            if (typeof b2[i2] !== t) {
              return false;
            } else if (t === "object") {
              if (!deepEqual(a2[i2], b2[i2])) {
                return false;
              }
            }
          }
        } else {
          return false;
        }
      }
      if (a2.checksum || b2.checksum) {
        if (a2.checksum !== b2.checksum) {
          return false;
        } else {
          return true;
        }
      }
      let cnt = 0;
      for (let key in a2) {
        if (!a2.hasOwnProperty(key))
          continue;
        if (!b2.hasOwnProperty(key))
          return false;
        const k = b2[key];
        const k1 = a2[key];
        if (k === void 0 && k1 !== void 0) {
          return false;
        }
        const t = typeof k;
        if (t !== typeof k1) {
          return false;
        } else if (k && t === "object") {
          if (!deepEqual(k1, k)) {
            return false;
          }
        } else if (k !== k1) {
          return false;
        }
        cnt++;
      }
      for (const _key in b2) {
        if (!b2.hasOwnProperty(_key))
          continue;
        cnt--;
        if (cnt < 0) {
          return false;
        }
      }
    }
    return true;
  }, "deepEqual");
  var deepEqual_default = deepEqual;

  // node_modules/@based/hash/dist/src/crc32c.js
  var kCRCTable = Int32Array.of(0, 4067132163, 3778769143, 324072436, 3348797215, 904991772, 648144872, 3570033899, 2329499855, 2024987596, 1809983544, 2575936315, 1296289744, 3207089363, 2893594407, 1578318884, 274646895, 3795141740, 4049975192, 51262619, 3619967088, 632279923, 922689671, 3298075524, 2592579488, 1760304291, 2075979607, 2312596564, 1562183871, 2943781820, 3156637768, 1313733451, 549293790, 3537243613, 3246849577, 871202090, 3878099393, 357341890, 102525238, 4101499445, 2858735121, 1477399826, 1264559846, 3107202533, 1845379342, 2677391885, 2361733625, 2125378298, 820201905, 3263744690, 3520608582, 598981189, 4151959214, 85089709, 373468761, 3827903834, 3124367742, 1213305469, 1526817161, 2842354314, 2107672161, 2412447074, 2627466902, 1861252501, 1098587580, 3004210879, 2688576843, 1378610760, 2262928035, 1955203488, 1742404180, 2511436119, 3416409459, 969524848, 714683780, 3639785095, 205050476, 4266873199, 3976438427, 526918040, 1361435347, 2739821008, 2954799652, 1114974503, 2529119692, 1691668175, 2005155131, 2247081528, 3690758684, 697762079, 986182379, 3366744552, 476452099, 3993867776, 4250756596, 255256311, 1640403810, 2477592673, 2164122517, 1922457750, 2791048317, 1412925310, 1197962378, 3037525897, 3944729517, 427051182, 170179418, 4165941337, 746937522, 3740196785, 3451792453, 1070968646, 1905808397, 2213795598, 2426610938, 1657317369, 3053634322, 1147748369, 1463399397, 2773627110, 4215344322, 153784257, 444234805, 3893493558, 1021025245, 3467647198, 3722505002, 797665321, 2197175160, 1889384571, 1674398607, 2443626636, 1164749927, 3070701412, 2757221520, 1446797203, 137323447, 4198817972, 3910406976, 461344835, 3484808360, 1037989803, 781091935, 3705997148, 2460548119, 1623424788, 1939049696, 2180517859, 1429367560, 2807687179, 3020495871, 1180866812, 410100952, 3927582683, 4182430767, 186734380, 3756733383, 763408580, 1053836080, 3434856499, 2722870694, 1344288421, 1131464017, 2971354706, 1708204729, 2545590714, 2229949006, 1988219213, 680717673, 3673779818, 3383336350, 1002577565, 4010310262, 493091189, 238226049, 4233660802, 2987750089, 1082061258, 1395524158, 2705686845, 1972364758, 2279892693, 2494862625, 1725896226, 952904198, 3399985413, 3656866545, 731699698, 4283874585, 222117402, 510512622, 3959836397, 3280807620, 837199303, 582374963, 3504198960, 68661723, 4135334616, 3844915500, 390545967, 1230274059, 3141532936, 2825850620, 1510247935, 2395924756, 2091215383, 1878366691, 2644384480, 3553878443, 565732008, 854102364, 3229815391, 340358836, 3861050807, 4117890627, 119113024, 1493875044, 2875275879, 3090270611, 1247431312, 2660249211, 1828433272, 2141937292, 2378227087, 3811616794, 291187481, 34330861, 4032846830, 615137029, 3603020806, 3314634738, 939183345, 1776939221, 2609017814, 2295496738, 2058945313, 2926798794, 1545135305, 1330124605, 3173225534, 4084100981, 17165430, 307568514, 3762199681, 888469610, 3332340585, 3587147933, 665062302, 2042050490, 2346497209, 2559330125, 1793573966, 3190661285, 1279665062, 1595330642, 2910671697);
  var crc32c_default = /* @__PURE__ */ __name((val) => {
    let data;
    let initial = 0;
    if (typeof val === "string") {
      const encoder3 = new TextEncoder();
      data = encoder3.encode(val);
    } else {
      data = val;
    }
    let crc = (initial | 0) ^ -1;
    for (let i2 = 0; i2 < data.length; i2++) {
      crc = kCRCTable[(crc ^ data[i2]) & 255] ^ crc >>> 8;
    }
    return (crc ^ -1) >>> 0;
  }, "default");

  // node_modules/@based/hash/dist/src/stringHash.js
  var stringHash = /* @__PURE__ */ __name((str, hash2 = 5381) => {
    let i2 = str.length;
    while (i2) {
      const char = str.charCodeAt(--i2);
      hash2 = hash2 * 33 ^ char;
    }
    return hash2;
  }, "stringHash");
  var stringHash_default = stringHash;

  // node_modules/@based/hash/dist/src/hashField.js
  var hashFieldLegacy = /* @__PURE__ */ __name((hash2, hash22, i2, field, nest) => {
    const type = typeof field;
    let f = "";
    if (type === "string") {
      f = i2 + ":" + field;
    } else if (type === "number") {
      f = i2 + "n:" + field;
    } else if (type === "object") {
      if (field === null) {
        f = i2 + "v:null";
      } else {
        const x = nest(field, hash2, hash22);
        return [stringHash_default(i2 + "o:", x[0]), stringHash_default(i2 + "o:", x[1])];
      }
    } else if (type === "boolean") {
      f = i2 + "b:" + (field ? "true" : "false");
    }
    return [stringHash_default(f, hash2), stringHash_default(f, hash22)];
  }, "hashFieldLegacy");

  // node_modules/@based/hash/dist/src/hashObjectNest.js
  var hashObjectNest = /* @__PURE__ */ __name((obj, hash2 = 5381, hash22 = 52711) => {
    if (Array.isArray(obj)) {
      for (let i2 = 0; i2 < obj.length; i2++) {
        const result = hashFieldLegacy(hash2, hash22, i2, obj[i2], hashObjectNest);
        hash2 = result[0];
        hash22 = result[1];
      }
    } else {
      for (const key in obj) {
        if (key === void 0) {
          continue;
        }
        const result = hashFieldLegacy(hash2, hash22, key, obj[key], hashObjectNest);
        hash2 = result[0];
        hash22 = result[1];
      }
    }
    return [hash2, hash22];
  }, "hashObjectNest");
  var hashObjectNest_default = hashObjectNest;

  // node_modules/@based/hash/dist/src/hashObject.js
  var hashObject = /* @__PURE__ */ __name((props) => {
    const x = hashObjectNest_default(props);
    return (x[0] >>> 0) * 4096 + x[1];
  }, "hashObject");
  var hashObject_default = hashObject;

  // node_modules/@based/hash/dist/src/hash.js
  var hash = /* @__PURE__ */ __name((val, size) => {
    let result;
    if (typeof val === "object") {
      if (val === null) {
        result = 0;
      } else {
        result = hashObject_default(val);
      }
    } else {
      if (typeof val === "boolean") {
        result = val ? 792222265344 : 4821552340992;
      } else if (typeof val === "number") {
        result = (stringHash_default("n:" + val) >>> 0) * 4096 + (stringHash_default("n:" + val, 52711) >>> 0);
      } else {
        result = (stringHash_default(val) >>> 0) * 4096 + (stringHash_default(val, 52711) >>> 0);
      }
    }
    if (size) {
      const len = Math.ceil(Math.log10(result + 1));
      if (len < size) {
        return result * Math.pow(10, size - len);
      }
    }
    return result;
  }, "hash");
  var hash_default = hash;

  // node_modules/@based/hash/dist/src/hashObjectIgnoreKeyOrderNest.js
  var hashObjectIgnoreKeyOrderNest = /* @__PURE__ */ __name((obj, hash2 = 5381, hash22 = 52711) => {
    if (Array.isArray(obj)) {
      const fl2 = "__len:" + obj.length + 1;
      hash2 = stringHash_default(fl2, hash2);
      hash22 = stringHash_default(fl2, hash22);
      for (let i2 = 0; i2 < obj.length; i2++) {
        const field = obj[i2];
        const result = hashFieldLegacy(hash2, hash22, i2, field, hashObjectIgnoreKeyOrderNest);
        hash2 = result[0];
        hash22 = result[1];
      }
    } else {
      const keys = Object.keys(obj).sort();
      const fl2 = "__len:" + keys.length + 1;
      hash2 = stringHash_default(fl2, hash2);
      hash22 = stringHash_default(fl2, hash22);
      for (let i2 = 0; i2 < keys.length; i2++) {
        const key = keys[i2];
        if (key === void 0) {
          continue;
        }
        const field = obj[key];
        const result = hashFieldLegacy(hash2, hash22, key, field, hashObjectIgnoreKeyOrderNest);
        hash2 = result[0];
        hash22 = result[1];
      }
    }
    return [hash2, hash22];
  }, "hashObjectIgnoreKeyOrderNest");
  var hashObjectIgnoreKeyOrderNest_default = hashObjectIgnoreKeyOrderNest;

  // node_modules/@based/hash/dist/src/hashObjectIgnoreKeyOrder.js
  var hashObjectIgnoreKeyOrder = /* @__PURE__ */ __name((props) => {
    const x = hashObjectIgnoreKeyOrderNest_default(props);
    return (x[0] >>> 0) * 4096 + (x[1] >>> 0);
  }, "hashObjectIgnoreKeyOrder");
  var hashObjectIgnoreKeyOrder_default = hashObjectIgnoreKeyOrder;

  // node_modules/@based/utils/dist/src/padding.js
  var padLeft = /* @__PURE__ */ __name((str, len, char) => {
    const l2 = str.length;
    for (let i2 = 0; i2 < len - l2; i2++) {
      str = char + str;
    }
    return str;
  }, "padLeft");

  // node_modules/@based/utils/dist/src/encoder/decode.js
  var createDecode = /* @__PURE__ */ __name((isLong, longest, encodeChars = ["$"], reverseCharMap) => {
    if (encodeChars.length > 1 && isLong) {
      return (input) => {
        let str = "";
        for (let i2 = 0; i2 < input.length; i2++) {
          const c2 = input[i2];
          if (encodeChars.includes(c2)) {
            let fInput = "";
            for (let j = 0; j < longest; j++) {
              fInput += input[i2 + j + 1];
            }
            const f = reverseCharMap[fInput];
            str += f;
            i2 += longest;
          } else {
            str += c2;
          }
        }
        return str;
      };
    }
    if (encodeChars.length > 1) {
      return (input) => {
        let str = "";
        for (let i2 = 0; i2 < input.length; i2++) {
          const c2 = input[i2];
          if (encodeChars.includes(c2)) {
            const f = reverseCharMap[input[i2 + 1]];
            str += f;
            i2++;
          } else {
            str += c2;
          }
        }
        return str;
      };
    }
    const char = encodeChars[0];
    if (isLong) {
      return (input) => {
        let str = "";
        for (let i2 = 0; i2 < input.length; i2++) {
          const c2 = input[i2];
          if (c2 === char) {
            let fInput = "";
            for (let j = 0; j < longest; j++) {
              fInput += input[i2 + j + 1];
            }
            const f = reverseCharMap[fInput];
            str += f;
            i2 += longest;
          } else {
            str += c2;
          }
        }
        return str;
      };
    }
    return (input) => {
      let str = "";
      for (let i2 = 0; i2 < input.length; i2++) {
        const c2 = input[i2];
        if (c2 === char) {
          const f = reverseCharMap[input[i2 + 1]];
          str += f;
          i2++;
        } else {
          str += c2;
        }
      }
      return str;
    };
  }, "createDecode");

  // node_modules/@based/utils/dist/src/encoder/encode.js
  var cycleChars = /* @__PURE__ */ __name((encodeChars, encodeCharIndex) => {
    if (encodeCharIndex % 2) {
      return encodeChars[encodeChars.length - encodeCharIndex];
    }
    return encodeChars[encodeCharIndex];
  }, "cycleChars");
  var createEncode = /* @__PURE__ */ __name((charLen, charMap2, encodeChars) => {
    if (encodeChars.length > 1 && charLen === 1) {
      const encodeCharsLen = encodeChars.length;
      return (input) => {
        let encodeCharIndex = 0;
        let str = "";
        for (let i2 = 0; i2 < input.length; i2++) {
          const c2 = input.charAt(i2);
          if (charMap2[c2]) {
            encodeCharIndex += 1;
            if (encodeCharIndex >= encodeCharsLen) {
              encodeCharIndex = 0;
            }
            str += cycleChars(encodeChars, encodeCharIndex) + charMap2[c2];
          } else {
            str += c2;
          }
        }
        return str;
      };
    }
    if (encodeChars.length > 1) {
      const encodeCharsLen = encodeChars.length;
      return (input) => {
        let encodeCharIndex = 0;
        let str = "";
        for (let i2 = 0; i2 < input.length; i2++) {
          let added = false;
          for (let j = charLen - 1; j > -1; j--) {
            if (i2 + j > input.length - 1) {
              continue;
            }
            let s = "";
            for (let n2 = 0; n2 < j + 1; n2++) {
              s += input.charAt(i2 + n2);
            }
            if (charMap2[s]) {
              encodeCharIndex += 1;
              if (encodeCharIndex >= encodeCharsLen) {
                encodeCharIndex = 0;
              }
              str += cycleChars(encodeChars, encodeCharIndex) + charMap2[s];
              i2 += s.length - 1;
              j = -1;
              added = true;
            }
          }
          if (!added) {
            str += input.charAt(i2);
          }
        }
        return str;
      };
    }
    if (charLen === 1) {
      return (input) => {
        let str = "";
        for (let i2 = 0; i2 < input.length; i2++) {
          const c2 = input.charAt(i2);
          if (charMap2[c2]) {
            str += charMap2[c2];
          } else {
            str += c2;
          }
        }
        return str;
      };
    }
    return (input) => {
      let str = "";
      for (let i2 = 0; i2 < input.length; i2++) {
        let added = false;
        for (let j = charLen - 1; j > -1; j--) {
          if (i2 + j > input.length - 1) {
            continue;
          }
          let s = "";
          for (let n2 = 0; n2 < j + 1; n2++) {
            s += input.charAt(i2 + n2);
          }
          if (charMap2[s]) {
            str += charMap2[s];
            i2 += s.length - 1;
            j = -1;
            added = true;
          }
        }
        if (!added) {
          str += input.charAt(i2);
        }
      }
      return str;
    };
  }, "createEncode");

  // node_modules/@based/utils/dist/src/encoder/index.js
  var createEncoder = /* @__PURE__ */ __name((chars, encodeChars = ["$"]) => {
    let charLen = 1;
    const isLong = chars.length > 36;
    const realChars = [...chars, ...encodeChars];
    const replacement = realChars.map((v, i2) => {
      if (v.length > charLen) {
        charLen = v.length;
      }
      if (i2 > 25) {
        return String(i2 - 26);
      }
      return String.fromCharCode(97 + i2);
    });
    const charMap2 = {};
    const reverseCharMap = {};
    for (let i2 = 0; i2 < realChars.length; i2++) {
      charMap2[realChars[i2]] = encodeChars.length === 1 ? encodeChars[0] + replacement[i2] : replacement[i2];
      reverseCharMap[replacement[i2]] = realChars[i2];
    }
    let longest = 1;
    if (isLong) {
      for (const key in reverseCharMap) {
        if (key.length > longest) {
          longest = key.length;
        }
      }
      for (const key in reverseCharMap) {
        if (key.length < longest) {
          const nKey = padLeft(key, longest, "0");
          const c2 = reverseCharMap[key];
          if (encodeChars.length > 1) {
            charMap2[c2] = nKey;
          } else {
            charMap2[c2] = encodeChars[0] + nKey;
          }
          delete reverseCharMap[key];
          reverseCharMap[nKey] = c2;
        }
      }
    }
    return {
      charMap: charMap2,
      reverseCharMap,
      encode: createEncode(charLen, charMap2, encodeChars),
      decode: createDecode(isLong, longest, encodeChars, reverseCharMap)
    };
  }, "createEncoder");

  // node_modules/@based/utils/dist/src/path.js
  function setByPath(target, path, value) {
    if (typeof target !== "object") {
      return target;
    }
    let d2 = target;
    for (let i2 = 0; i2 < path.length; i2++) {
      const seg = path[i2];
      if (i2 === path.length - 1) {
        d2[seg] = value;
        break;
      }
      if (d2[seg] === void 0) {
        if (typeof path[i2 + 1] === "number") {
          d2[seg] = [];
        } else {
          d2[seg] = {};
        }
      }
      d2 = d2[seg];
    }
    return target;
  }
  __name(setByPath, "setByPath");

  // node_modules/@based/utils/dist/src/base64.js
  var b64ToUint6 = /* @__PURE__ */ __name((nChr) => {
    return nChr > 64 && nChr < 91 ? nChr - 65 : nChr > 96 && nChr < 123 ? nChr - 71 : nChr > 47 && nChr < 58 ? nChr + 4 : nChr === 43 ? 62 : nChr === 47 ? 63 : 0;
  }, "b64ToUint6");
  var uint6ToB64 = /* @__PURE__ */ __name((nUint6) => {
    return nUint6 < 26 ? nUint6 + 65 : nUint6 < 52 ? nUint6 + 71 : nUint6 < 62 ? nUint6 - 4 : nUint6 === 62 ? 43 : nUint6 === 63 ? 47 : 65;
  }, "uint6ToB64");
  var decodeBase64 = /* @__PURE__ */ __name((base64String, nBlocksSize) => {
    const sB64Enc = base64String.replace(/[^A-Za-z0-9+/]/g, "");
    const nInLen = sB64Enc.length;
    const nOutLen = nBlocksSize ? Math.ceil((nInLen * 3 + 1 >> 2) / nBlocksSize) * nBlocksSize : nInLen * 3 + 1 >> 2;
    const taBytes = new Uint8Array(nOutLen);
    let nMod3;
    let nMod4;
    let nUint24 = 0;
    let nOutIdx = 0;
    for (let nInIdx = 0; nInIdx < nInLen; nInIdx++) {
      nMod4 = nInIdx & 3;
      nUint24 |= b64ToUint6(sB64Enc.charCodeAt(nInIdx)) << 6 * (3 - nMod4);
      if (nMod4 === 3 || nInLen - nInIdx === 1) {
        nMod3 = 0;
        while (nMod3 < 3 && nOutIdx < nOutLen) {
          taBytes[nOutIdx] = nUint24 >>> (16 >>> nMod3 & 24) & 255;
          nMod3++;
          nOutIdx++;
        }
        nUint24 = 0;
      }
    }
    return taBytes;
  }, "decodeBase64");
  var encodeBase64 = /* @__PURE__ */ __name((utf8Array) => {
    let nMod3 = 2;
    let sB64Enc = "";
    const nLen = utf8Array.length;
    let nUint24 = 0;
    for (let nIdx = 0; nIdx < nLen; nIdx++) {
      nMod3 = nIdx % 3;
      nUint24 |= utf8Array[nIdx] << (16 >>> nMod3 & 24);
      if (nMod3 === 2 || utf8Array.length - nIdx === 1) {
        sB64Enc += String.fromCodePoint(uint6ToB64(nUint24 >>> 18 & 63), uint6ToB64(nUint24 >>> 12 & 63), uint6ToB64(nUint24 >>> 6 & 63), uint6ToB64(nUint24 & 63));
        nUint24 = 0;
      }
    }
    return sB64Enc.substring(0, sB64Enc.length - 2 + nMod3) + (nMod3 === 2 ? "" : nMod3 === 1 ? "=" : "==");
  }, "encodeBase64");

  // node_modules/@based/utils/dist/src/uint8.js
  var DECODER = new TextDecoder("utf-8");
  var ENCODER = new TextEncoder();
  var basedNative = typeof window === "undefined" ? global.__basedDb__native__ : null;
  var charMap = ENCODER.encode("0123456789abcdef");
  var readDoubleLE = /* @__PURE__ */ __name((val, offset) => {
    const low = (val[offset] | val[offset + 1] << 8 | val[offset + 2] << 16 | val[offset + 3] << 24) >>> 0;
    const high = (val[offset + 4] | val[offset + 5] << 8 | val[offset + 6] << 16 | val[offset + 7] << 24) >>> 0;
    const sign = high >>> 31 ? -1 : 1;
    let exponent = high >>> 20 & 2047;
    let fraction = (high & 1048575) * 2 ** 32 + low;
    if (exponent === 2047) {
      if (fraction === 0)
        return sign * Infinity;
      return NaN;
    }
    if (exponent === 0) {
      if (fraction === 0)
        return sign * 0;
      exponent = 1;
    } else {
      fraction += 2 ** 52;
    }
    return sign * fraction * 2 ** (exponent - 1075);
  }, "readDoubleLE");
  var readFloatLE = /* @__PURE__ */ __name((val, offset) => {
    const bits2 = val[offset] | val[offset + 1] << 8 | val[offset + 2] << 16 | val[offset + 3] << 24;
    const sign = bits2 >>> 31 ? -1 : 1;
    let exponent = bits2 >>> 23 & 255;
    let fraction = bits2 & 8388607;
    if (exponent === 255) {
      if (fraction === 0)
        return sign * Infinity;
      return NaN;
    }
    if (exponent === 0) {
      if (fraction === 0)
        return sign * 0;
      exponent = 1;
    } else {
      fraction |= 8388608;
    }
    return sign * fraction * 2 ** (exponent - 150);
  }, "readFloatLE");
  var writeUint24 = /* @__PURE__ */ __name((dest, val, offset) => {
    dest[offset] = val;
    dest[offset + 1] = val >>> 8;
    dest[offset + 2] = val >>> 16;
  }, "writeUint24");
  var writeUint32 = /* @__PURE__ */ __name((dest, val, offset) => {
    dest[offset + 0] = val;
    dest[offset + 1] = val >>> 8;
    dest[offset + 2] = val >>> 16;
    dest[offset + 3] = val >>> 24;
  }, "writeUint32");
  var writeUint64 = /* @__PURE__ */ __name((dest, val, offset) => {
    const byte0 = val & 255;
    dest[offset + 0] = byte0;
    val = (val - byte0) / 256;
    const byte1 = val & 255;
    dest[offset + 1] = byte1;
    val = (val - byte1) / 256;
    const byte2 = val & 255;
    dest[offset + 2] = byte2;
    val = (val - byte2) / 256;
    const byte3 = val & 255;
    dest[offset + 3] = byte3;
    val = (val - byte3) / 256;
    const byte4 = val & 255;
    dest[offset + 4] = byte4;
    val = (val - byte4) / 256;
    const byte5 = val & 255;
    dest[offset + 5] = byte5;
    val = (val - byte5) / 256;
    const byte6 = val & 255;
    dest[offset + 6] = byte6;
    val = (val - byte6) / 256;
    const byte7 = val & 255;
    dest[offset + 7] = byte7;
  }, "writeUint64");
  var readUint64 = /* @__PURE__ */ __name((src, offset) => {
    let n2 = src[offset + 7];
    n2 = n2 * 256 + src[offset + 6];
    n2 = n2 * 256 + src[offset + 5];
    n2 = n2 * 256 + src[offset + 4];
    n2 = n2 * 256 + src[offset + 3];
    n2 = n2 * 256 + src[offset + 2];
    n2 = n2 * 256 + src[offset + 1];
    n2 = n2 * 256 + src[offset + 0];
    return n2;
  }, "readUint64");
  var readInt64 = /* @__PURE__ */ __name((src, offset) => {
    if (src[offset + 7] & 128) {
      const view = new DataView(src.buffer, offset, 8);
      const result = view.getBigInt64(0, true);
      return Number(result);
    }
    let n2 = src[offset + 7];
    n2 = n2 * 256 + src[offset + 6];
    n2 = n2 * 256 + src[offset + 5];
    n2 = n2 * 256 + src[offset + 4];
    n2 = n2 * 256 + src[offset + 3];
    n2 = n2 * 256 + src[offset + 2];
    n2 = n2 * 256 + src[offset + 1];
    n2 = n2 * 256 + src[offset + 0];
    return n2;
  }, "readInt64");
  var readUint32 = /* @__PURE__ */ __name((val, offset) => {
    return (val[offset] | val[offset + 1] << 8 | val[offset + 2] << 16 | val[offset + 3] << 24) >>> 0;
  }, "readUint32");
  var readInt32 = /* @__PURE__ */ __name((val, offset) => {
    return val[offset] | val[offset + 1] << 8 | val[offset + 2] << 16 | val[offset + 3] << 24;
  }, "readInt32");
  var readUint24 = /* @__PURE__ */ __name((val, offset) => {
    return (val[offset] | val[offset + 1] << 8 | val[offset + 2] << 16) >>> 0;
  }, "readUint24");
  var readInt16 = /* @__PURE__ */ __name((val, offset) => {
    return (val[offset] | val[offset + 1] << 8) << 16 >> 16;
  }, "readInt16");
  var readUint16 = /* @__PURE__ */ __name((val, offset) => {
    return (val[offset] | val[offset + 1] << 8) >>> 0;
  }, "readUint16");
  var BITS_FOR_B = 21;
  var FACTOR = 2 ** BITS_FOR_B;
  var MASK_B = FACTOR - 1;
  var combineToNumber = /* @__PURE__ */ __name((a2, b2) => {
    const val1_unsigned = a2 >>> 0;
    const truncated_b = b2 & MASK_B;
    const shifted_a = val1_unsigned * FACTOR;
    return shifted_a + truncated_b;
  }, "combineToNumber");
  var readUtf8 = /* @__PURE__ */ __name((val, offset, len) => {
    return DECODER.decode(val.subarray(offset, len + offset));
  }, "readUtf8");

  // node_modules/@based/client/dist/src/authState/parseAuthState.js
  var decodeAuthState = /* @__PURE__ */ __name((authState) => {
    try {
      const str = new TextDecoder().decode(decodeBase64(decode(authState)));
      return JSON.parse(str);
    } catch (err2) {
      return { error: "Invalid authState" };
    }
  }, "decodeAuthState");
  var { encode, decode } = createEncoder([
    "(",
    ")",
    "<",
    ">",
    "@",
    ",",
    ";",
    ":",
    "\\",
    '"',
    "/",
    "[",
    "]",
    "?",
    "=",
    "{",
    "}",
    " "
  ], ["0"]);
  var encodeAuthState = /* @__PURE__ */ __name((authState) => {
    authState.v = 2;
    return encode(encodeBase64(new TextEncoder().encode(JSON.stringify(authState))));
  }, "encodeAuthState");

  // node_modules/@based/client/dist/src/stream/types.js
  var isFileContents = /* @__PURE__ */ __name((contents) => {
    return contents.contents instanceof File;
  }, "isFileContents");

  // node_modules/fflate/esm/browser.js
  var u8 = Uint8Array;
  var u16 = Uint16Array;
  var i32 = Int32Array;
  var fleb = new u8([
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    2,
    2,
    2,
    2,
    3,
    3,
    3,
    3,
    4,
    4,
    4,
    4,
    5,
    5,
    5,
    5,
    0,
    /* unused */
    0,
    0,
    /* impossible */
    0
  ]);
  var fdeb = new u8([
    0,
    0,
    0,
    0,
    1,
    1,
    2,
    2,
    3,
    3,
    4,
    4,
    5,
    5,
    6,
    6,
    7,
    7,
    8,
    8,
    9,
    9,
    10,
    10,
    11,
    11,
    12,
    12,
    13,
    13,
    /* unused */
    0,
    0
  ]);
  var clim = new u8([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
  var freb = /* @__PURE__ */ __name(function(eb, start) {
    var b2 = new u16(31);
    for (var i2 = 0; i2 < 31; ++i2) {
      b2[i2] = start += 1 << eb[i2 - 1];
    }
    var r = new i32(b2[30]);
    for (var i2 = 1; i2 < 30; ++i2) {
      for (var j = b2[i2]; j < b2[i2 + 1]; ++j) {
        r[j] = j - b2[i2] << 5 | i2;
      }
    }
    return { b: b2, r };
  }, "freb");
  var _a = freb(fleb, 2);
  var fl = _a.b;
  var revfl = _a.r;
  fl[28] = 258, revfl[258] = 28;
  var _b = freb(fdeb, 0);
  var fd = _b.b;
  var revfd = _b.r;
  var rev = new u16(32768);
  for (i2 = 0; i2 < 32768; ++i2) {
    x = (i2 & 43690) >> 1 | (i2 & 21845) << 1;
    x = (x & 52428) >> 2 | (x & 13107) << 2;
    x = (x & 61680) >> 4 | (x & 3855) << 4;
    rev[i2] = ((x & 65280) >> 8 | (x & 255) << 8) >> 1;
  }
  var x;
  var i2;
  var hMap = /* @__PURE__ */ __name(function(cd, mb, r) {
    var s = cd.length;
    var i2 = 0;
    var l2 = new u16(mb);
    for (; i2 < s; ++i2) {
      if (cd[i2])
        ++l2[cd[i2] - 1];
    }
    var le = new u16(mb);
    for (i2 = 1; i2 < mb; ++i2) {
      le[i2] = le[i2 - 1] + l2[i2 - 1] << 1;
    }
    var co;
    if (r) {
      co = new u16(1 << mb);
      var rvb = 15 - mb;
      for (i2 = 0; i2 < s; ++i2) {
        if (cd[i2]) {
          var sv = i2 << 4 | cd[i2];
          var r_1 = mb - cd[i2];
          var v = le[cd[i2] - 1]++ << r_1;
          for (var m = v | (1 << r_1) - 1; v <= m; ++v) {
            co[rev[v] >> rvb] = sv;
          }
        }
      }
    } else {
      co = new u16(s);
      for (i2 = 0; i2 < s; ++i2) {
        if (cd[i2]) {
          co[i2] = rev[le[cd[i2] - 1]++] >> 15 - cd[i2];
        }
      }
    }
    return co;
  }, "hMap");
  var flt = new u8(288);
  for (i2 = 0; i2 < 144; ++i2)
    flt[i2] = 8;
  var i2;
  for (i2 = 144; i2 < 256; ++i2)
    flt[i2] = 9;
  var i2;
  for (i2 = 256; i2 < 280; ++i2)
    flt[i2] = 7;
  var i2;
  for (i2 = 280; i2 < 288; ++i2)
    flt[i2] = 8;
  var i2;
  var fdt = new u8(32);
  for (i2 = 0; i2 < 32; ++i2)
    fdt[i2] = 5;
  var i2;
  var flm = /* @__PURE__ */ hMap(flt, 9, 0);
  var flrm = /* @__PURE__ */ hMap(flt, 9, 1);
  var fdm = /* @__PURE__ */ hMap(fdt, 5, 0);
  var fdrm = /* @__PURE__ */ hMap(fdt, 5, 1);
  var max = /* @__PURE__ */ __name(function(a2) {
    var m = a2[0];
    for (var i2 = 1; i2 < a2.length; ++i2) {
      if (a2[i2] > m)
        m = a2[i2];
    }
    return m;
  }, "max");
  var bits = /* @__PURE__ */ __name(function(d2, p, m) {
    var o2 = p / 8 | 0;
    return (d2[o2] | d2[o2 + 1] << 8) >> (p & 7) & m;
  }, "bits");
  var bits16 = /* @__PURE__ */ __name(function(d2, p) {
    var o2 = p / 8 | 0;
    return (d2[o2] | d2[o2 + 1] << 8 | d2[o2 + 2] << 16) >> (p & 7);
  }, "bits16");
  var shft = /* @__PURE__ */ __name(function(p) {
    return (p + 7) / 8 | 0;
  }, "shft");
  var slc = /* @__PURE__ */ __name(function(v, s, e) {
    if (s == null || s < 0)
      s = 0;
    if (e == null || e > v.length)
      e = v.length;
    return new u8(v.subarray(s, e));
  }, "slc");
  var ec = [
    "unexpected EOF",
    "invalid block type",
    "invalid length/literal",
    "invalid distance",
    "stream finished",
    "no stream handler",
    ,
    "no callback",
    "invalid UTF-8 data",
    "extra field too long",
    "date not in range 1980-2099",
    "filename too long",
    "stream finishing",
    "invalid zip data"
    // determined by unknown compression method
  ];
  var err = /* @__PURE__ */ __name(function(ind, msg, nt) {
    var e = new Error(msg || ec[ind]);
    e.code = ind;
    if (Error.captureStackTrace)
      Error.captureStackTrace(e, err);
    if (!nt)
      throw e;
    return e;
  }, "err");
  var inflt = /* @__PURE__ */ __name(function(dat, st, buf, dict) {
    var sl = dat.length, dl = dict ? dict.length : 0;
    if (!sl || st.f && !st.l)
      return buf || new u8(0);
    var noBuf = !buf;
    var resize = noBuf || st.i != 2;
    var noSt = st.i;
    if (noBuf)
      buf = new u8(sl * 3);
    var cbuf = /* @__PURE__ */ __name(function(l3) {
      var bl = buf.length;
      if (l3 > bl) {
        var nbuf = new u8(Math.max(bl * 2, l3));
        nbuf.set(buf);
        buf = nbuf;
      }
    }, "cbuf");
    var final = st.f || 0, pos = st.p || 0, bt = st.b || 0, lm = st.l, dm = st.d, lbt = st.m, dbt = st.n;
    var tbts = sl * 8;
    do {
      if (!lm) {
        final = bits(dat, pos, 1);
        var type = bits(dat, pos + 1, 3);
        pos += 3;
        if (!type) {
          var s = shft(pos) + 4, l2 = dat[s - 4] | dat[s - 3] << 8, t = s + l2;
          if (t > sl) {
            if (noSt)
              err(0);
            break;
          }
          if (resize)
            cbuf(bt + l2);
          buf.set(dat.subarray(s, t), bt);
          st.b = bt += l2, st.p = pos = t * 8, st.f = final;
          continue;
        } else if (type == 1)
          lm = flrm, dm = fdrm, lbt = 9, dbt = 5;
        else if (type == 2) {
          var hLit = bits(dat, pos, 31) + 257, hcLen = bits(dat, pos + 10, 15) + 4;
          var tl = hLit + bits(dat, pos + 5, 31) + 1;
          pos += 14;
          var ldt = new u8(tl);
          var clt = new u8(19);
          for (var i2 = 0; i2 < hcLen; ++i2) {
            clt[clim[i2]] = bits(dat, pos + i2 * 3, 7);
          }
          pos += hcLen * 3;
          var clb = max(clt), clbmsk = (1 << clb) - 1;
          var clm = hMap(clt, clb, 1);
          for (var i2 = 0; i2 < tl; ) {
            var r = clm[bits(dat, pos, clbmsk)];
            pos += r & 15;
            var s = r >> 4;
            if (s < 16) {
              ldt[i2++] = s;
            } else {
              var c2 = 0, n2 = 0;
              if (s == 16)
                n2 = 3 + bits(dat, pos, 3), pos += 2, c2 = ldt[i2 - 1];
              else if (s == 17)
                n2 = 3 + bits(dat, pos, 7), pos += 3;
              else if (s == 18)
                n2 = 11 + bits(dat, pos, 127), pos += 7;
              while (n2--)
                ldt[i2++] = c2;
            }
          }
          var lt = ldt.subarray(0, hLit), dt = ldt.subarray(hLit);
          lbt = max(lt);
          dbt = max(dt);
          lm = hMap(lt, lbt, 1);
          dm = hMap(dt, dbt, 1);
        } else
          err(1);
        if (pos > tbts) {
          if (noSt)
            err(0);
          break;
        }
      }
      if (resize)
        cbuf(bt + 131072);
      var lms = (1 << lbt) - 1, dms = (1 << dbt) - 1;
      var lpos = pos;
      for (; ; lpos = pos) {
        var c2 = lm[bits16(dat, pos) & lms], sym = c2 >> 4;
        pos += c2 & 15;
        if (pos > tbts) {
          if (noSt)
            err(0);
          break;
        }
        if (!c2)
          err(2);
        if (sym < 256)
          buf[bt++] = sym;
        else if (sym == 256) {
          lpos = pos, lm = null;
          break;
        } else {
          var add = sym - 254;
          if (sym > 264) {
            var i2 = sym - 257, b2 = fleb[i2];
            add = bits(dat, pos, (1 << b2) - 1) + fl[i2];
            pos += b2;
          }
          var d2 = dm[bits16(dat, pos) & dms], dsym = d2 >> 4;
          if (!d2)
            err(3);
          pos += d2 & 15;
          var dt = fd[dsym];
          if (dsym > 3) {
            var b2 = fdeb[dsym];
            dt += bits16(dat, pos) & (1 << b2) - 1, pos += b2;
          }
          if (pos > tbts) {
            if (noSt)
              err(0);
            break;
          }
          if (resize)
            cbuf(bt + 131072);
          var end = bt + add;
          if (bt < dt) {
            var shift = dl - dt, dend = Math.min(dt, end);
            if (shift + bt < 0)
              err(3);
            for (; bt < dend; ++bt)
              buf[bt] = dict[shift + bt];
          }
          for (; bt < end; ++bt)
            buf[bt] = buf[bt - dt];
        }
      }
      st.l = lm, st.p = lpos, st.b = bt, st.f = final;
      if (lm)
        final = 1, st.m = lbt, st.d = dm, st.n = dbt;
    } while (!final);
    return bt != buf.length && noBuf ? slc(buf, 0, bt) : buf.subarray(0, bt);
  }, "inflt");
  var wbits = /* @__PURE__ */ __name(function(d2, p, v) {
    v <<= p & 7;
    var o2 = p / 8 | 0;
    d2[o2] |= v;
    d2[o2 + 1] |= v >> 8;
  }, "wbits");
  var wbits16 = /* @__PURE__ */ __name(function(d2, p, v) {
    v <<= p & 7;
    var o2 = p / 8 | 0;
    d2[o2] |= v;
    d2[o2 + 1] |= v >> 8;
    d2[o2 + 2] |= v >> 16;
  }, "wbits16");
  var hTree = /* @__PURE__ */ __name(function(d2, mb) {
    var t = [];
    for (var i2 = 0; i2 < d2.length; ++i2) {
      if (d2[i2])
        t.push({ s: i2, f: d2[i2] });
    }
    var s = t.length;
    var t2 = t.slice();
    if (!s)
      return { t: et, l: 0 };
    if (s == 1) {
      var v = new u8(t[0].s + 1);
      v[t[0].s] = 1;
      return { t: v, l: 1 };
    }
    t.sort(function(a2, b2) {
      return a2.f - b2.f;
    });
    t.push({ s: -1, f: 25001 });
    var l2 = t[0], r = t[1], i0 = 0, i1 = 1, i22 = 2;
    t[0] = { s: -1, f: l2.f + r.f, l: l2, r };
    while (i1 != s - 1) {
      l2 = t[t[i0].f < t[i22].f ? i0++ : i22++];
      r = t[i0 != i1 && t[i0].f < t[i22].f ? i0++ : i22++];
      t[i1++] = { s: -1, f: l2.f + r.f, l: l2, r };
    }
    var maxSym = t2[0].s;
    for (var i2 = 1; i2 < s; ++i2) {
      if (t2[i2].s > maxSym)
        maxSym = t2[i2].s;
    }
    var tr = new u16(maxSym + 1);
    var mbt = ln(t[i1 - 1], tr, 0);
    if (mbt > mb) {
      var i2 = 0, dt = 0;
      var lft = mbt - mb, cst = 1 << lft;
      t2.sort(function(a2, b2) {
        return tr[b2.s] - tr[a2.s] || a2.f - b2.f;
      });
      for (; i2 < s; ++i2) {
        var i2_1 = t2[i2].s;
        if (tr[i2_1] > mb) {
          dt += cst - (1 << mbt - tr[i2_1]);
          tr[i2_1] = mb;
        } else
          break;
      }
      dt >>= lft;
      while (dt > 0) {
        var i2_2 = t2[i2].s;
        if (tr[i2_2] < mb)
          dt -= 1 << mb - tr[i2_2]++ - 1;
        else
          ++i2;
      }
      for (; i2 >= 0 && dt; --i2) {
        var i2_3 = t2[i2].s;
        if (tr[i2_3] == mb) {
          --tr[i2_3];
          ++dt;
        }
      }
      mbt = mb;
    }
    return { t: new u8(tr), l: mbt };
  }, "hTree");
  var ln = /* @__PURE__ */ __name(function(n2, l2, d2) {
    return n2.s == -1 ? Math.max(ln(n2.l, l2, d2 + 1), ln(n2.r, l2, d2 + 1)) : l2[n2.s] = d2;
  }, "ln");
  var lc = /* @__PURE__ */ __name(function(c2) {
    var s = c2.length;
    while (s && !c2[--s])
      ;
    var cl = new u16(++s);
    var cli = 0, cln = c2[0], cls = 1;
    var w = /* @__PURE__ */ __name(function(v) {
      cl[cli++] = v;
    }, "w");
    for (var i2 = 1; i2 <= s; ++i2) {
      if (c2[i2] == cln && i2 != s)
        ++cls;
      else {
        if (!cln && cls > 2) {
          for (; cls > 138; cls -= 138)
            w(32754);
          if (cls > 2) {
            w(cls > 10 ? cls - 11 << 5 | 28690 : cls - 3 << 5 | 12305);
            cls = 0;
          }
        } else if (cls > 3) {
          w(cln), --cls;
          for (; cls > 6; cls -= 6)
            w(8304);
          if (cls > 2)
            w(cls - 3 << 5 | 8208), cls = 0;
        }
        while (cls--)
          w(cln);
        cls = 1;
        cln = c2[i2];
      }
    }
    return { c: cl.subarray(0, cli), n: s };
  }, "lc");
  var clen = /* @__PURE__ */ __name(function(cf, cl) {
    var l2 = 0;
    for (var i2 = 0; i2 < cl.length; ++i2)
      l2 += cf[i2] * cl[i2];
    return l2;
  }, "clen");
  var wfblk = /* @__PURE__ */ __name(function(out, pos, dat) {
    var s = dat.length;
    var o2 = shft(pos + 2);
    out[o2] = s & 255;
    out[o2 + 1] = s >> 8;
    out[o2 + 2] = out[o2] ^ 255;
    out[o2 + 3] = out[o2 + 1] ^ 255;
    for (var i2 = 0; i2 < s; ++i2)
      out[o2 + i2 + 4] = dat[i2];
    return (o2 + 4 + s) * 8;
  }, "wfblk");
  var wblk = /* @__PURE__ */ __name(function(dat, out, final, syms, lf, df, eb, li, bs, bl, p) {
    wbits(out, p++, final);
    ++lf[256];
    var _a2 = hTree(lf, 15), dlt = _a2.t, mlb = _a2.l;
    var _b2 = hTree(df, 15), ddt = _b2.t, mdb = _b2.l;
    var _c = lc(dlt), lclt = _c.c, nlc = _c.n;
    var _d = lc(ddt), lcdt = _d.c, ndc = _d.n;
    var lcfreq = new u16(19);
    for (var i2 = 0; i2 < lclt.length; ++i2)
      ++lcfreq[lclt[i2] & 31];
    for (var i2 = 0; i2 < lcdt.length; ++i2)
      ++lcfreq[lcdt[i2] & 31];
    var _e = hTree(lcfreq, 7), lct = _e.t, mlcb = _e.l;
    var nlcc = 19;
    for (; nlcc > 4 && !lct[clim[nlcc - 1]]; --nlcc)
      ;
    var flen = bl + 5 << 3;
    var ftlen = clen(lf, flt) + clen(df, fdt) + eb;
    var dtlen = clen(lf, dlt) + clen(df, ddt) + eb + 14 + 3 * nlcc + clen(lcfreq, lct) + 2 * lcfreq[16] + 3 * lcfreq[17] + 7 * lcfreq[18];
    if (bs >= 0 && flen <= ftlen && flen <= dtlen)
      return wfblk(out, p, dat.subarray(bs, bs + bl));
    var lm, ll, dm, dl;
    wbits(out, p, 1 + (dtlen < ftlen)), p += 2;
    if (dtlen < ftlen) {
      lm = hMap(dlt, mlb, 0), ll = dlt, dm = hMap(ddt, mdb, 0), dl = ddt;
      var llm = hMap(lct, mlcb, 0);
      wbits(out, p, nlc - 257);
      wbits(out, p + 5, ndc - 1);
      wbits(out, p + 10, nlcc - 4);
      p += 14;
      for (var i2 = 0; i2 < nlcc; ++i2)
        wbits(out, p + 3 * i2, lct[clim[i2]]);
      p += 3 * nlcc;
      var lcts = [lclt, lcdt];
      for (var it = 0; it < 2; ++it) {
        var clct = lcts[it];
        for (var i2 = 0; i2 < clct.length; ++i2) {
          var len = clct[i2] & 31;
          wbits(out, p, llm[len]), p += lct[len];
          if (len > 15)
            wbits(out, p, clct[i2] >> 5 & 127), p += clct[i2] >> 12;
        }
      }
    } else {
      lm = flm, ll = flt, dm = fdm, dl = fdt;
    }
    for (var i2 = 0; i2 < li; ++i2) {
      var sym = syms[i2];
      if (sym > 255) {
        var len = sym >> 18 & 31;
        wbits16(out, p, lm[len + 257]), p += ll[len + 257];
        if (len > 7)
          wbits(out, p, sym >> 23 & 31), p += fleb[len];
        var dst = sym & 31;
        wbits16(out, p, dm[dst]), p += dl[dst];
        if (dst > 3)
          wbits16(out, p, sym >> 5 & 8191), p += fdeb[dst];
      } else {
        wbits16(out, p, lm[sym]), p += ll[sym];
      }
    }
    wbits16(out, p, lm[256]);
    return p + ll[256];
  }, "wblk");
  var deo = /* @__PURE__ */ new i32([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]);
  var et = /* @__PURE__ */ new u8(0);
  var dflt = /* @__PURE__ */ __name(function(dat, lvl, plvl, pre, post, st) {
    var s = st.z || dat.length;
    var o2 = new u8(pre + s + 5 * (1 + Math.ceil(s / 7e3)) + post);
    var w = o2.subarray(pre, o2.length - post);
    var lst = st.l;
    var pos = (st.r || 0) & 7;
    if (lvl) {
      if (pos)
        w[0] = st.r >> 3;
      var opt = deo[lvl - 1];
      var n2 = opt >> 13, c2 = opt & 8191;
      var msk_1 = (1 << plvl) - 1;
      var prev = st.p || new u16(32768), head = st.h || new u16(msk_1 + 1);
      var bs1_1 = Math.ceil(plvl / 3), bs2_1 = 2 * bs1_1;
      var hsh = /* @__PURE__ */ __name(function(i3) {
        return (dat[i3] ^ dat[i3 + 1] << bs1_1 ^ dat[i3 + 2] << bs2_1) & msk_1;
      }, "hsh");
      var syms = new i32(25e3);
      var lf = new u16(288), df = new u16(32);
      var lc_1 = 0, eb = 0, i2 = st.i || 0, li = 0, wi = st.w || 0, bs = 0;
      for (; i2 + 2 < s; ++i2) {
        var hv = hsh(i2);
        var imod = i2 & 32767, pimod = head[hv];
        prev[imod] = pimod;
        head[hv] = imod;
        if (wi <= i2) {
          var rem = s - i2;
          if ((lc_1 > 7e3 || li > 24576) && (rem > 423 || !lst)) {
            pos = wblk(dat, w, 0, syms, lf, df, eb, li, bs, i2 - bs, pos);
            li = lc_1 = eb = 0, bs = i2;
            for (var j = 0; j < 286; ++j)
              lf[j] = 0;
            for (var j = 0; j < 30; ++j)
              df[j] = 0;
          }
          var l2 = 2, d2 = 0, ch_1 = c2, dif = imod - pimod & 32767;
          if (rem > 2 && hv == hsh(i2 - dif)) {
            var maxn = Math.min(n2, rem) - 1;
            var maxd = Math.min(32767, i2);
            var ml = Math.min(258, rem);
            while (dif <= maxd && --ch_1 && imod != pimod) {
              if (dat[i2 + l2] == dat[i2 + l2 - dif]) {
                var nl = 0;
                for (; nl < ml && dat[i2 + nl] == dat[i2 + nl - dif]; ++nl)
                  ;
                if (nl > l2) {
                  l2 = nl, d2 = dif;
                  if (nl > maxn)
                    break;
                  var mmd = Math.min(dif, nl - 2);
                  var md = 0;
                  for (var j = 0; j < mmd; ++j) {
                    var ti = i2 - dif + j & 32767;
                    var pti = prev[ti];
                    var cd = ti - pti & 32767;
                    if (cd > md)
                      md = cd, pimod = ti;
                  }
                }
              }
              imod = pimod, pimod = prev[imod];
              dif += imod - pimod & 32767;
            }
          }
          if (d2) {
            syms[li++] = 268435456 | revfl[l2] << 18 | revfd[d2];
            var lin = revfl[l2] & 31, din = revfd[d2] & 31;
            eb += fleb[lin] + fdeb[din];
            ++lf[257 + lin];
            ++df[din];
            wi = i2 + l2;
            ++lc_1;
          } else {
            syms[li++] = dat[i2];
            ++lf[dat[i2]];
          }
        }
      }
      for (i2 = Math.max(i2, wi); i2 < s; ++i2) {
        syms[li++] = dat[i2];
        ++lf[dat[i2]];
      }
      pos = wblk(dat, w, lst, syms, lf, df, eb, li, bs, i2 - bs, pos);
      if (!lst) {
        st.r = pos & 7 | w[pos / 8 | 0] << 3;
        pos -= 7;
        st.h = head, st.p = prev, st.i = i2, st.w = wi;
      }
    } else {
      for (var i2 = st.w || 0; i2 < s + lst; i2 += 65535) {
        var e = i2 + 65535;
        if (e >= s) {
          w[pos / 8 | 0] = lst;
          e = s;
        }
        pos = wfblk(w, pos + 1, dat.subarray(i2, e));
      }
      st.i = s;
    }
    return slc(o2, 0, pre + shft(pos) + post);
  }, "dflt");
  var dopt = /* @__PURE__ */ __name(function(dat, opt, pre, post, st) {
    if (!st) {
      st = { l: 1 };
      if (opt.dictionary) {
        var dict = opt.dictionary.subarray(-32768);
        var newDat = new u8(dict.length + dat.length);
        newDat.set(dict);
        newDat.set(dat, dict.length);
        dat = newDat;
        st.w = dict.length;
      }
    }
    return dflt(dat, opt.level == null ? 6 : opt.level, opt.mem == null ? st.l ? Math.ceil(Math.max(8, Math.min(13, Math.log(dat.length))) * 1.5) : 20 : 12 + opt.mem, pre, post, st);
  }, "dopt");
  function deflateSync(data, opts) {
    return dopt(data, opts || {}, 0, 0);
  }
  __name(deflateSync, "deflateSync");
  function inflateSync(data, opts) {
    return inflt(data, { i: 2 }, opts && opts.out, opts && opts.dictionary);
  }
  __name(inflateSync, "inflateSync");
  var td = typeof TextDecoder != "undefined" && /* @__PURE__ */ new TextDecoder();
  var tds = 0;
  try {
    td.decode(et, { stream: true });
    tds = 1;
  } catch (e) {
  }

  // node_modules/@based/client/dist/src/persistentStorage/constants.js
  var CACHE_NAME = "@based";
  var CACHE_PREFIX = CACHE_NAME + "-cache";
  var CACHE_SIZE = CACHE_NAME + "-size";
  var CACHE_AUTH = CACHE_NAME + "-authState";

  // node_modules/@based/client/dist/src/persistentStorage/browser.js
  var decoder = new TextDecoder("utf-8");
  var encoder = new TextEncoder();
  var decode2 = /* @__PURE__ */ __name((dataURI) => {
    const uncompressed = decoder.decode(inflateSync(decodeBase64(dataURI)));
    const parsed = JSON.parse(uncompressed);
    return parsed;
  }, "decode");
  var removeStorageBrowser = /* @__PURE__ */ __name((client, key) => {
    const prev = localStorage.getItem(key);
    if (prev) {
      client.storageSize -= new Blob([prev]).size;
      localStorage.setItem(CACHE_SIZE, String(client.storageSize));
      localStorage.removeItem(key);
    }
  }, "removeStorageBrowser");
  var clearStorageBrowser = /* @__PURE__ */ __name(() => {
    const keys = Object.keys(localStorage);
    try {
      for (const key of keys) {
        if (key.startsWith(CACHE_NAME)) {
          localStorage.removeItem(key);
        }
      }
    } catch (err2) {
      try {
        localStorage.clear();
      } catch (err3) {
      }
    }
  }, "clearStorageBrowser");
  var setStorageBrowser = /* @__PURE__ */ __name((client, key, value) => {
    try {
      const env2 = client.storageEnvKey;
      if (!env2) {
        return;
      }
      const prev = localStorage.getItem(key);
      const stringifiedJson = JSON.stringify(value);
      const encoded = stringifiedJson.length > 70 || key === CACHE_AUTH + "-" + env2 ? encodeBase64(deflateSync(encoder.encode(stringifiedJson))) : stringifiedJson;
      const blob = new Blob([encoded]);
      const size = blob.size;
      if (prev) {
        client.storageSize -= new Blob([prev]).size;
      }
      client.storageSize += size;
      if (client.storageSize > client.maxStorageSize) {
        clearStorageBrowser();
        client.storageSize = 0;
        if (client.authState.persistent === true) {
          setStorageBrowser(client, CACHE_AUTH + "-" + env2, client.authState);
        }
        client.storageSize += size;
      }
      localStorage.setItem(CACHE_SIZE, String(client.storageSize));
      localStorage.setItem(key, encoded);
    } catch (err2) {
      console.error(`Based - Error writing ${key} to localStorage`, err2);
    }
  }, "setStorageBrowser");
  var getStorageBrowser = /* @__PURE__ */ __name((client, key) => {
    const env2 = client.storageEnvKey;
    if (!env2) {
      return;
    }
    try {
      const value = localStorage.getItem(key);
      if (value !== void 0) {
        if (value.length < 70 && key !== CACHE_AUTH + "-" + env2) {
          try {
            return JSON.parse(value);
          } catch (err2) {
          }
        }
        return decode2(value);
      }
      return;
    } catch (err2) {
    }
  }, "getStorageBrowser");
  var initStorageBrowser = /* @__PURE__ */ __name(async (client) => {
    const env2 = client.storageEnvKey;
    if (!env2) {
      return;
    }
    const prevCache = global.__basedcache__ ?? {};
    for (const key in prevCache) {
      client.cache.set(Number(key), prevCache[key]);
    }
    try {
      let totalSize = Number(localStorage.getItem(CACHE_SIZE) || 0);
      if (totalSize < 0) {
        clearStorageBrowser();
        totalSize = 0;
      }
      client.storageSize = totalSize;
      const keys = Object.keys(localStorage);
      if (keys.length === 1 && totalSize > 0) {
        clearStorageBrowser();
        totalSize = 0;
      }
      if (totalSize > 0) {
        for (const key of keys) {
            
          if (key === CACHE_SIZE || !key.startsWith(CACHE_NAME)) {
            continue;
          }
          if (key === CACHE_AUTH + "-" + env2) {
              
            const authState = getStorageBrowser(client, key);
            if (authState) {
              client.setAuthState(authState).catch((err2) => {
                console.error(err2.message);
                removeStorageBrowser(client, key);
              });
            }
            continue;
          }
          const [, keyValuePair] = key.split(CACHE_PREFIX);
          if (!keyValuePair) {
            continue;
          }
          const [id, e] = keyValuePair.split("-");
          if (e !== String(env2)) {
            continue;
          }
          if (!id) {
            removeStorageBrowser(client, key);
            continue;
          }
          const value = getStorageBrowser(client, key);
          client.cache.set(Number(id), value);
        }
      }
    } catch (err2) {
        console.log(err2)
    }
  }, "initStorageBrowser");
  var removeStorage = /* @__PURE__ */ __name((client, key) => {
    const env2 = client.storageEnvKey;
    if (!env2) {
      return;
    }
    key += "-" + env2;
    removeStorageBrowser(client, key);
  }, "removeStorage");
  var setStorage = /* @__PURE__ */ __name((client, key, value) => {
    const env2 = client.storageEnvKey;
    if (!env2) {
      return;
    }
    key += "-" + env2;
    setStorageBrowser(client, key, value);
  }, "setStorage");
  var updateStorage = /* @__PURE__ */ __name(async (_client, _instant) => {
  }, "updateStorage");
  var initStorage = /* @__PURE__ */ __name(async (client) => {
    return initStorageBrowser(client);
  }, "initStorage");
  var clearStorage = /* @__PURE__ */ __name(async (_client) => {
    return clearStorageBrowser();
  }, "clearStorage");

  // node_modules/@based/client/dist/src/authState/updateAuthState.js
  var updateAuthState = /* @__PURE__ */ __name((client, authState) => {
    if (authState.persistent) {
      setStorage(client, CACHE_AUTH, authState);
    } else {
      removeStorage(client, CACHE_AUTH);
    }
    client.authState = authState;
  }, "updateAuthState");

  // node_modules/@based/client/dist/src/contentType.js
  var CONTENT_TYPE_JSON = 255;
  var CONTENT_TYPE_UINT8_ARRAY = 254;
  var CONTENT_TYPE_STRING = 253;
  var CONTENT_TYPE_UNDEFINED = 252;
  var CONTENT_TYPE_NULL = 251;
  var CONTENT_TYPE_DB_QUERY = 249;
  var CONTENT_TYPE_JSON_U8 = new Uint8Array([CONTENT_TYPE_JSON]);
  var CONTENT_TYPE_UINT8_ARRAY_U8 = new Uint8Array([
    CONTENT_TYPE_UINT8_ARRAY
  ]);
  var CONTENT_TYPE_STRING_U8 = new Uint8Array([CONTENT_TYPE_STRING]);
  var CONTENT_TYPE_UNDEFINED_U8 = new Uint8Array([
    CONTENT_TYPE_UNDEFINED
  ]);
  var CONTENT_TYPE_NULL_U8 = new Uint8Array([CONTENT_TYPE_NULL]);
  var CONTENT_TYPE_DB_QUERY_U8 = new Uint8Array([CONTENT_TYPE_DB_QUERY]);

  // node_modules/@based/protocol/dist/client-server/types.js
  var FunctionServerType;
  (function(FunctionServerType2) {
    FunctionServerType2[FunctionServerType2["function"] = 0] = "function";
    FunctionServerType2[FunctionServerType2["subscribe"] = 1] = "subscribe";
    FunctionServerType2[FunctionServerType2["unsubscribe"] = 2] = "unsubscribe";
    FunctionServerType2[FunctionServerType2["get"] = 3] = "get";
    FunctionServerType2[FunctionServerType2["auth"] = 4] = "auth";
    FunctionServerType2[FunctionServerType2["channelSubscribe"] = 5] = "channelSubscribe";
    FunctionServerType2[FunctionServerType2["channelPublish"] = 6] = "channelPublish";
    FunctionServerType2[FunctionServerType2["subType"] = 7] = "subType";
  })(FunctionServerType || (FunctionServerType = {}));
  var FunctionServerSubType;
  (function(FunctionServerSubType2) {
    FunctionServerSubType2[FunctionServerSubType2["channelUnsubscribe"] = 0] = "channelUnsubscribe";
    FunctionServerSubType2[FunctionServerSubType2["registerStream"] = 1] = "registerStream";
    FunctionServerSubType2[FunctionServerSubType2["chunk"] = 2] = "chunk";
  })(FunctionServerSubType || (FunctionServerSubType = {}));
  var FunctionClientType;
  (function(FunctionClientType2) {
    FunctionClientType2[FunctionClientType2["function"] = 0] = "function";
    FunctionClientType2[FunctionClientType2["subscriptionData"] = 1] = "subscriptionData";
    FunctionClientType2[FunctionClientType2["subscriptionDiff"] = 2] = "subscriptionDiff";
    FunctionClientType2[FunctionClientType2["get"] = 3] = "get";
    FunctionClientType2[FunctionClientType2["auth"] = 4] = "auth";
    FunctionClientType2[FunctionClientType2["error"] = 5] = "error";
    FunctionClientType2[FunctionClientType2["rePublishChannelName"] = 6] = "rePublishChannelName";
    FunctionClientType2[FunctionClientType2["subType"] = 7] = "subType";
  })(FunctionClientType || (FunctionClientType = {}));
  var FunctionClientSubType;
  (function(FunctionClientSubType2) {
    FunctionClientSubType2[FunctionClientSubType2["channel"] = 0] = "channel";
    FunctionClientSubType2[FunctionClientSubType2["streamFullResponse"] = 1] = "streamFullResponse";
    FunctionClientSubType2[FunctionClientSubType2["streamChunkResponse"] = 2] = "streamChunkResponse";
    FunctionClientSubType2[FunctionClientSubType2["forceReload"] = 3] = "forceReload";
  })(FunctionClientSubType || (FunctionClientSubType = {}));

  // node_modules/@based/protocol/dist/client-server/genObserveId.js
  var calculateHash32 = /* @__PURE__ */ __name((name, uint8Array, seed = 0) => {
    let hash2 = seed;
    const prime1 = 31;
    const prime2 = 17;
    const prime3 = 41;
    for (let i2 = 0; i2 < name.length; i2++) {
      const charCode = name.charCodeAt(i2);
      hash2 = hash2 * prime3 ^ charCode;
      hash2 = hash2 * prime1 & 4294967295;
    }
    for (let i2 = 0; i2 < uint8Array.length; i2++) {
      hash2 = hash2 * prime1 ^ uint8Array[i2];
      hash2 = hash2 * prime2 & 4294967295;
    }
    hash2 ^= hash2 >>> 16;
    hash2 = Math.imul(hash2, 2246822507);
    hash2 ^= hash2 >>> 13;
    hash2 = Math.imul(hash2, 3266489909);
    hash2 ^= hash2 >>> 16;
    return hash2 >>> 0;
  }, "calculateHash32");
  var simpleHashU8 = /* @__PURE__ */ __name((name, uint8Array) => {
    const seed1 = 2882400001;
    const seed2 = 285138106;
    const hashPart1 = calculateHash32(name, uint8Array, seed1);
    const hashPart2 = calculateHash32(name, uint8Array, seed2);
    const highBitsContribution = Number(hashPart1) * 2097152;
    const lowBitsContribution = hashPart2 >>> 11;
    const result = highBitsContribution + lowBitsContribution;
    return result;
  }, "simpleHashU8");
  var genObserveId = /* @__PURE__ */ __name((name, payload) => {
    if (payload === void 0) {
      return hash_default(name);
    }
    if (payload instanceof Uint8Array) {
      return simpleHashU8(name, payload);
    } else if (typeof payload === "string") {
      return simpleHashU8(name, ENCODER.encode(payload));
    } else {
      return hashObjectIgnoreKeyOrder_default([name, payload]);
    }
  }, "genObserveId");

  // node_modules/@based/client/dist/src/outgoing/protocol.js
  var encoder2 = new TextEncoder();
  var encodeHeader = /* @__PURE__ */ __name((type, isDeflate, len) => {
    const encodedMeta = (type << 1) + (isDeflate | 0);
    const nr = (len << 4) + encodedMeta;
    return nr;
  }, "encodeHeader");
  var createBuffer = /* @__PURE__ */ __name((type, isDeflate, len, size = len) => {
    const header = encodeHeader(type, isDeflate, len);
    const buf = new Uint8Array(size);
    writeUint32(buf, header, 0);
    return buf;
  }, "createBuffer");
  var COMPRESS_FROM_BYTES = 150;
  var EMPTY_BUFFER = new Uint8Array([]);
  var encodePayloadV2 = /* @__PURE__ */ __name((payload, deflate2) => {
    if (payload === void 0) {
      return {
        contentByte: CONTENT_TYPE_UNDEFINED_U8,
        deflate: false,
        buf: EMPTY_BUFFER
      };
    }
    if (typeof payload === "string") {
      const buf2 = ENCODER.encode(payload);
      if (deflate2 && buf2.byteLength > COMPRESS_FROM_BYTES) {
        return {
          contentByte: CONTENT_TYPE_STRING_U8,
          buf: deflateSync(buf2),
          deflate: true
        };
      }
      return {
        contentByte: CONTENT_TYPE_STRING_U8,
        buf: buf2,
        deflate: false
      };
    }
    if (payload instanceof Uint8Array) {
      return {
        contentByte: CONTENT_TYPE_UINT8_ARRAY_U8,
        buf: payload,
        deflate: false
      };
    }
    const buf = ENCODER.encode(JSON.stringify(payload));
    if (buf.byteLength > COMPRESS_FROM_BYTES) {
      return {
        contentByte: CONTENT_TYPE_JSON_U8,
        buf: deflateSync(buf),
        deflate: true
      };
    }
    const result = {
      contentByte: CONTENT_TYPE_JSON_U8,
      buf,
      deflate: false
    };
    return result;
  }, "encodePayloadV2");
  var encodeGetObserveMessage = /* @__PURE__ */ __name((id, o2) => {
    let len = 4;
    const [type, name, checksum, payload] = o2;
    if (type === FunctionServerType.get) {
      const n2 = encoder2.encode(name);
      len += 1 + n2.length;
      const val = encodePayloadV2(payload, true);
      len += val.buf.byteLength + 1;
      const buffLen = 16;
      len += buffLen;
      const buff = createBuffer(type, val.deflate, len, 5 + buffLen);
      writeUint64(buff, id, 4);
      writeUint64(buff, checksum, 12);
      buff[20] = n2.length;
      return { buffers: [buff, n2, val.contentByte, val.buf], len };
    }
    return { buffers: [], len: 0 };
  }, "encodeGetObserveMessage");
  var encodeSubscribeChannelMessage = /* @__PURE__ */ __name((id, o2) => {
    let len = 4;
    const [type, name, payload] = o2;
    if (type === 7) {
      const buff2 = createBuffer(FunctionServerType.subType, false, 13);
      buff2[4] = FunctionServerSubType.channelUnsubscribe;
      writeUint64(buff2, id, 5);
      return { buffers: [buff2], len: 13 };
    }
    const n2 = encoder2.encode(name);
    len += 1 + n2.length;
    const isRequestSubscriber = type === 6;
    const val = encodePayloadV2(payload, false);
    len += val.buf.byteLength + 1;
    const buffLen = 8;
    len += buffLen;
    const buff = createBuffer(FunctionServerType.channelSubscribe, isRequestSubscriber, len, 5 + buffLen);
    writeUint64(buff, id, 4);
    buff[12] = n2.length;
    return { buffers: [buff, n2, val.contentByte, val.buf], len };
  }, "encodeSubscribeChannelMessage");
  var encodeObserveMessage = /* @__PURE__ */ __name((id, o2) => {
    let len = 4;
    const [type, name, checksum, payload] = o2;
    if (type === 2) {
      const buff2 = createBuffer(type, false, 12);
      writeUint64(buff2, id, 4);
      return { buffers: [buff2], len: 12 };
    }
    const n2 = encoder2.encode(name);
    len += 1 + n2.length;
    const val = encodePayloadV2(payload, true);
    len += val.buf.byteLength + 1;
    const buffLen = 16;
    len += buffLen;
    const buff = createBuffer(type, val.deflate, len, 5 + buffLen);
    writeUint64(buff, id, 4);
    writeUint64(buff, checksum, 12);
    buff[20] = n2.length;
    return { buffers: [buff, n2, val.contentByte, val.buf], len };
  }, "encodeObserveMessage");
  var encodeFunctionMessage = /* @__PURE__ */ __name((f) => {
    let len = 7;
    const [id, name, payload] = f;
    const n2 = encoder2.encode(name);
    len += 1 + n2.length;
    const val = encodePayloadV2(payload, true);
    len += val.buf.byteLength + 1;
    const buff = createBuffer(0, val.deflate, len, 8);
    writeUint24(buff, id, 4);
    buff[7] = n2.length;
    return { buffers: [buff, n2, val.contentByte, val.buf], len };
  }, "encodeFunctionMessage");
  var encodePublishMessage = /* @__PURE__ */ __name((f) => {
    let len = 12;
    const [id, payload] = f;
    const val = encodePayloadV2(payload, true);
    len += val.buf.byteLength + 1;
    const buff = createBuffer(6, val.deflate, len, 12);
    writeUint64(buff, id, 4);
    return { buffers: [buff, val.contentByte, val.buf], len };
  }, "encodePublishMessage");
  var encodeAuthMessage = /* @__PURE__ */ __name((authState) => {
    let len = 4;
    const val = encodePayloadV2(authState, true);
    len += val.buf.byteLength + 1;
    const buff = createBuffer(4, val.deflate, len);
    buff[4] = val.contentByte[0];
    if (val.buf.byteLength) {
      buff.set(val.buf, 5);
    }
    return buff;
  }, "encodeAuthMessage");
  var encodeStreamMessage = /* @__PURE__ */ __name((f) => {
    const [subType, reqId] = f;
    if (subType === 1) {
      const [, , contentSize, name, mimeType, extension, fnName, payload] = f;
      let sLen = 16;
      let len = sLen;
      const nameEncoded = encoder2.encode(name);
      len += nameEncoded.length;
      const val = encodePayloadV2(payload, true);
      len += val.buf.byteLength + 1;
      const mimeTypeEncoded = encoder2.encode(mimeType);
      len += mimeTypeEncoded.length;
      const fnNameEncoded = encoder2.encode(fnName);
      len += fnNameEncoded.length;
      const extensionEncoded = encoder2.encode(extension);
      len += extensionEncoded.length;
      const buff = createBuffer(7, val.deflate, len, sLen);
      buff[4] = 1;
      writeUint24(buff, reqId, 5);
      writeUint32(buff, contentSize, 8);
      buff[12] = nameEncoded.length;
      buff[13] = mimeTypeEncoded.length;
      buff[14] = fnNameEncoded.length;
      buff[15] = extensionEncoded.length;
      return {
        buffers: [
          buff,
          nameEncoded,
          mimeTypeEncoded,
          fnNameEncoded,
          extensionEncoded,
          val.contentByte,
          val.buf
        ],
        len
      };
    } else if (subType === 2) {
      let sLen = 9;
      let len = sLen;
      const [, , seqId, chunk] = f;
      let isDeflate = false;
      let processed = chunk;
      if (chunk.length > 150) {
        processed = deflateSync(chunk);
        len += processed.length;
        isDeflate = true;
      } else {
        len += chunk.length;
      }
      const buff = createBuffer(7, isDeflate, len, sLen);
      buff[4] = 2;
      writeUint24(buff, reqId, 5);
      buff[8] = seqId;
      return { buffers: [buff, processed], len };
    }
    return { buffers: [], len: 0 };
  }, "encodeStreamMessage");

  // node_modules/@based/client/dist/src/outgoing/index.js
  var PING = new Uint8Array(0);
  var idleTimeout = /* @__PURE__ */ __name((client) => {
    const updateTime = 60 * 1e3;
    clearTimeout(client.idlePing);
    client.idlePing = setTimeout(() => {
      if (client.connection && client.connected && !client.connection.disconnected) {
        client.connection.ws.send(PING);
      }
    }, updateTime);
  }, "idleTimeout");
  var hasQueue = /* @__PURE__ */ __name((client) => {
    return !!(client.fQ.length || client.oQ.size || client.gQ.size || client.cQ.size || client.pQ.length || client.sQ.length);
  }, "hasQueue");
  var drainQueue = /* @__PURE__ */ __name((client) => {
    if (client.connected && !client.drainInProgress && hasQueue(client)) {
      if (client.opts.lazy) {
        const keepAlive = client.opts?.lazy.keepAlive;
        client.connection.keeAliveLastUpdated = keepAlive;
      }
      client.drainInProgress = true;
      const drainOutgoing = /* @__PURE__ */ __name(() => {
        client.drainInProgress = false;
        if (!client.connected) {
          return;
        }
        if (hasQueue(client)) {
          const channel = client.cQ;
          const publish = client.pQ;
          const fn = client.fQ;
          const obs = client.oQ;
          const get = client.gQ;
          const stream = client.sQ;
          const buffs = [];
          let l2 = 0;
          for (const [id, o2] of channel) {
            const { buffers, len } = encodeSubscribeChannelMessage(id, o2);
            buffs.push(...buffers);
            l2 += len;
          }
          for (const [id, o2] of get) {
            const { buffers, len } = encodeGetObserveMessage(id, o2);
            buffs.push(...buffers);
            l2 += len;
          }
          for (const [id, o2] of obs) {
            const { buffers, len } = encodeObserveMessage(id, o2);
            buffs.push(...buffers);
            l2 += len;
          }
          for (const f of fn) {
            const { buffers, len } = encodeFunctionMessage(f);
            buffs.push(...buffers);
            l2 += len;
          }
          for (const f of publish) {
            const { buffers, len } = encodePublishMessage(f);
            buffs.push(...buffers);
            l2 += len;
          }
          for (const s of stream) {
            const { buffers, len } = encodeStreamMessage(s);
            buffs.push(...buffers);
            l2 += len;
          }
          const n2 = new Uint8Array(l2);
          let c2 = 0;
          for (const b2 of buffs) {
            n2.set(b2, c2);
            c2 += b2.length;
          }
          client.fQ = [];
          client.pQ = [];
          client.sQ = [];
          client.oQ.clear();
          client.gQ.clear();
          client.cQ.clear();
          client.connection.ws.send(n2);
          idleTimeout(client);
        }
      }, "drainOutgoing");
      client.drainTimeout = setTimeout(drainOutgoing, 0);
    } else if (client.opts?.lazy && !client.connection) {
      client.connection = websocket_default(client, client.url);
    }
  }, "drainQueue");
  var addToFunctionQueue = /* @__PURE__ */ __name((client, payload, name, resolve, reject) => {
    client.requestId++;
    if (client.requestId > 16777215) {
      client.requestId = 0;
    }
    const id = client.requestId;
    const s = Error().stack.split(/BasedClient\.function.+:\d\d\)/)[1];
    client.functionResponseListeners.set(id, [resolve, reject, s]);
    client.fQ.push([id, name, payload]);
    drainQueue(client);
  }, "addToFunctionQueue");
  var addChannelCloseToQueue = /* @__PURE__ */ __name((client, id) => {
    const type = client.cQ.get(id)?.[0];
    if (type === 7) {
      return;
    }
    client.cQ.set(id, [7]);
    drainQueue(client);
  }, "addChannelCloseToQueue");
  var addChannelSubscribeToQueue = /* @__PURE__ */ __name((client, name, id, payload) => {
    const type = client.cQ.get(id)?.[0];
    if (type === 5) {
      return;
    }
    client.cQ.set(id, [5, name, payload]);
    drainQueue(client);
  }, "addChannelSubscribeToQueue");
  var addChannelPublishIdentifier = /* @__PURE__ */ __name((client, name, id, payload) => {
    const type = client.cQ.get(id)?.[0];
    if (type === 5 || type === 6) {
      return;
    }
    client.cQ.set(id, [6, name, payload]);
    drainQueue(client);
  }, "addChannelPublishIdentifier");
  var addToPublishQueue = /* @__PURE__ */ __name((client, id, payload) => {
    if (client.pQ.length > client.maxPublishQueue) {
      client.pQ.shift();
    }
    client.pQ.push([id, payload]);
    drainQueue(client);
  }, "addToPublishQueue");
  var addObsCloseToQueue = /* @__PURE__ */ __name((client, id) => {
    const type = client.oQ.get(id)?.[0];
    if (type === 2) {
      return;
    }
    client.oQ.set(id, [2]);
    drainQueue(client);
  }, "addObsCloseToQueue");
  var addObsToQueue = /* @__PURE__ */ __name((client, name, id, payload, checksum = 0) => {
    const type = client.oQ.get(id)?.[0];
    if (type === 1) {
      return;
    }
    client.oQ.set(id, [1, name, checksum, payload]);
    drainQueue(client);
  }, "addObsToQueue");
  var addGetToQueue = /* @__PURE__ */ __name((client, name, id, payload, checksum = 0) => {
    if (client.gQ.has(id)) {
      return;
    }
    client.gQ.set(id, [3, name, checksum, payload]);
    drainQueue(client);
  }, "addGetToQueue");
  var sendAuth = /* @__PURE__ */ __name(async (client, authState) => {
    if (deepEqual_default(authState, client.authState)) {
      console.warn("[Based] Trying to send the same authState twice", client.authState);
      return client.authRequest.inProgress ? client.authRequest.promise : new Promise((resolve) => resolve({}));
    }
    if (client.authRequest.inProgress) {
      console.warn("[Based] Authentication still in progress - waiting until done");
      await client.authRequest.promise;
    }
    updateAuthState(client, authState);
    client.emit("authstate-change", client.authState);
    if (client.connected) {
      client.connection.ws.send(encodeAuthMessage(authState));
    }
    client.authRequest.promise = new Promise((resolve, reject) => {
      client.authRequest.inProgress = true;
      client.authRequest.resolve = resolve;
      client.authRequest.reject = reject;
    }).finally(() => {
      client.authRequest.resolve = null;
      client.authRequest.reject = null;
      client.authRequest.inProgress = false;
    });
    return client.authRequest.promise;
  }, "sendAuth");
  var addStreamRegister = /* @__PURE__ */ __name((client, reqId, contentSize, name, mimeType, extension, fnName, payload) => {
    client.sQ.push([
      1,
      reqId,
      contentSize,
      name,
      mimeType,
      extension,
      fnName,
      payload
    ]);
    drainQueue(client);
  }, "addStreamRegister");
  var addStreamChunk = /* @__PURE__ */ __name((client, reqId, seqId, chunk, deflate2) => {
    if (client.connected) {
      const { len, buffers } = encodeStreamMessage([
        2,
        reqId,
        seqId,
        chunk,
        deflate2
      ]);
      const n2 = new Uint8Array(len);
      let c2 = 0;
      for (const b2 of buffers) {
        n2.set(b2, c2);
        c2 += b2.length;
      }
      client.connection.ws.send(n2);
      idleTimeout(client);
    } else {
      client.sQ.push([2, reqId, seqId, chunk, deflate2]);
    }
  }, "addStreamChunk");

  // node_modules/@based/client/dist/src/stream/browserStream.js
  var waitForChunk = /* @__PURE__ */ __name((reader) => {
    return new Promise((resolve) => {
      reader.addEventListener("loadend", (e) => {
        resolve(new Uint8Array(reader.result));
      });
    });
  }, "waitForChunk");
  var uploadFile = /* @__PURE__ */ __name(async (client, name, options, progressListener) => {
    if (!(options.contents instanceof File)) {
      throw new Error('File Contents has to be an instance of "File"');
    }
    if (!client.connected) {
      await client.once("connect");
    }
    let reqId = ++client.streamRequestId;
    if (reqId > 16777215) {
      reqId = client.streamRequestId = 0;
    }
    let seqId = 0;
    addStreamRegister(client, reqId, options.size, options.fileName, options.mimeType, options.extension, name, options.payload);
    const useDeflate = !(options.mimeType ? /image|video|x-zip/i.test(options.mimeType) : options.extension ? /(mp4|avi|mov|zip|jpg|jpeg|png|gif|mkv)/i.test(options.extension) : false);
    const smallest = 1e5;
    const maxSize = 1e6 * 10;
    const medium = 1e6 * 1;
    let readSize = Math.min(medium, options.size);
    if (options.size < medium * 5) {
      readSize = Math.min(smallest, options.size);
    } else if (options.size > medium * 100) {
      readSize = maxSize;
    }
    let streamHandler;
    const waitForStream = /* @__PURE__ */ __name(() => {
      return new Promise((resolve) => {
        streamHandler[2] = (seqId2, code, maxChunkSize) => {
          if (maxChunkSize) {
            readSize = maxChunkSize;
          }
          resolve({ seqId: seqId2, maxChunkSize, code });
        };
      });
    }, "waitForStream");
    async function* loadFileInChunks(file) {
      let totalBytes = 0;
      while (totalBytes < file.size) {
        const end = Math.min(totalBytes + file.size, totalBytes + readSize);
        const chunk = file.slice(totalBytes, end);
        const reader = new FileReader();
        reader.readAsArrayBuffer(chunk);
        const result = await waitForChunk(reader);
        if (seqId === 255) {
          seqId = 0;
        }
        addStreamChunk(client, reqId, ++seqId, result, useDeflate);
        await waitForStream();
        totalBytes += chunk.size;
        yield totalBytes;
      }
      yield totalBytes;
    }
    __name(loadFileInChunks, "loadFileInChunks");
    let id = Math.random().toString(16);
    const dcHandler = /* @__PURE__ */ __name(() => {
    }, "dcHandler");
    client.once("disconnect", dcHandler);
    return new Promise(async (resolve, reject) => {
      streamHandler = [resolve, reject, () => {
      }];
      client.streamFunctionResponseListeners.set(reqId, streamHandler);
      for await (const read of loadFileInChunks(options.contents)) {
        if (progressListener) {
          progressListener(read / options.size, read);
        }
      }
      client.off("disconnect", dcHandler);
    });
  }, "uploadFile");

  // node_modules/@based/client/dist/src/stream/browser.js
  var isStreaming = { streaming: false };
  var browser_default = /* @__PURE__ */ __name(async (client, name, options, progressListener) => {
    if (options.contents instanceof ArrayBuffer || typeof options.contents === "string") {
      options.contents = new global.Blob([options.contents], {
        type: options.mimeType || "text/plain"
      });
    }
    if (options.contents instanceof global.Blob) {
      if (!options.mimeType) {
        options.mimeType = options.contents.type;
      }
      options.contents = new File([options.contents], options.fileName || "blob", { type: options.contents.type });
    }
    if (isFileContents(options)) {
      if (!options.size) {
        options.size = options.contents.size;
      }
      return uploadFile(client, name, options, progressListener);
    }
    throw new Error(`Invalid opts for file api ${name} ${JSON.stringify(options, null, 2)}`);
  }, "default");

  // node_modules/@based/fetch/browser.js
  var browser_default2 = fetch;

  // node_modules/isomorphic-ws/browser.js
  var ws = null;
  if (typeof WebSocket !== "undefined") {
    ws = WebSocket;
  } else if (typeof MozWebSocket !== "undefined") {
    ws = MozWebSocket;
  } else if (typeof global !== "undefined") {
    ws = global.WebSocket || global.MozWebSocket;
  } else if (typeof window !== "undefined") {
    ws = window.WebSocket || window.MozWebSocket;
  } else if (typeof self !== "undefined") {
    ws = self.WebSocket || self.MozWebSocket;
  }
  var browser_default3 = ws;

  // node_modules/@saulx/diff/node_modules/@saulx/utils/dist/src/deepCopy.js
  var deepCopy = /* @__PURE__ */ __name((a2) => {
    const r = Array.isArray(a2) ? [] : {};
    for (const k in a2) {
      if (a2[k] !== null && typeof a2[k] === "object") {
        r[k] = deepCopy(a2[k]);
      } else {
        r[k] = a2[k];
      }
    }
    return r;
  }, "deepCopy");
  var deepCopy_default = deepCopy;

  // node_modules/@saulx/hash/dist/src/stringHash.js
  var stringHash2 = /* @__PURE__ */ __name((str, hash2 = 5381) => {
    let i2 = str.length;
    while (i2) {
      const char = str.charCodeAt(--i2);
      hash2 = hash2 * 33 ^ char;
    }
    return hash2;
  }, "stringHash");
  var stringHash_default2 = stringHash2;

  // node_modules/@saulx/hash/dist/src/hashField.js
  var hashFieldLegacy2 = /* @__PURE__ */ __name((hash2, hash22, i2, field, nest) => {
    const type = typeof field;
    let f = "";
    if (type === "string") {
      f = i2 + ":" + field;
    } else if (type === "number") {
      f = i2 + "n:" + field;
    } else if (type === "object") {
      if (field === null) {
        f = i2 + "v:null";
      } else {
        const x = nest(field, hash2, hash22);
        return [stringHash_default2(i2 + "o:", x[0]), stringHash_default2(i2 + "o:", x[1])];
      }
    } else if (type === "boolean") {
      f = i2 + "b:" + (field ? "true" : "false");
    }
    return [stringHash_default2(f, hash2), stringHash_default2(f, hash22)];
  }, "hashFieldLegacy");

  // node_modules/@saulx/hash/dist/src/hashObjectIgnoreKeyOrderNest.js
  var hashObjectIgnoreKeyOrderNest2 = /* @__PURE__ */ __name((obj, hash2 = 5381, hash22 = 52711) => {
    if (Array.isArray(obj)) {
      const fl2 = "__len:" + obj.length + 1;
      hash2 = stringHash_default2(fl2, hash2);
      hash22 = stringHash_default2(fl2, hash22);
      for (let i2 = 0; i2 < obj.length; i2++) {
        const field = obj[i2];
        const result = hashFieldLegacy2(hash2, hash22, i2, field, hashObjectIgnoreKeyOrderNest2);
        hash2 = result[0];
        hash22 = result[1];
      }
    } else {
      const keys = Object.keys(obj).sort();
      const fl2 = "__len:" + keys.length + 1;
      hash2 = stringHash_default2(fl2, hash2);
      hash22 = stringHash_default2(fl2, hash22);
      for (let i2 = 0; i2 < keys.length; i2++) {
        const key = keys[i2];
        if (key === void 0) {
          continue;
        }
        const field = obj[key];
        const result = hashFieldLegacy2(hash2, hash22, key, field, hashObjectIgnoreKeyOrderNest2);
        hash2 = result[0];
        hash22 = result[1];
      }
    }
    return [hash2, hash22];
  }, "hashObjectIgnoreKeyOrderNest");
  var hashObjectIgnoreKeyOrderNest_default2 = hashObjectIgnoreKeyOrderNest2;

  // node_modules/@saulx/hash/dist/src/hashObjectIgnoreKeyOrder.js
  var hashObjectIgnoreKeyOrder2 = /* @__PURE__ */ __name((props) => {
    const x = hashObjectIgnoreKeyOrderNest_default2(props);
    return (x[0] >>> 0) * 4096 + (x[1] >>> 0);
  }, "hashObjectIgnoreKeyOrder");
  var hashObjectIgnoreKeyOrder_default2 = hashObjectIgnoreKeyOrder2;

  // node_modules/@saulx/diff/dist/src/applyPatch.js
  var nestedApplyPatch = /* @__PURE__ */ __name((value, key, patch) => {
    if (patch.constructor === Array) {
      const type = patch[0];
      if (type === 0) {
        value[key] = patch[1];
      } else if (type === 1) {
        delete value[key];
      } else if (type === 2) {
        const r = applyArrayPatch(value[key], patch[1]);
        if (r === null) {
          return null;
        }
        value[key] = r;
      }
    } else {
      if (patch.___$toObject && value[key] && value[key].constructor === Array) {
        const v = {};
        for (let i2 = 0; i2 < value[key].length; i2++) {
          v[i2] = value[key][i2];
        }
        value[key] = v;
      }
      if (value[key] === void 0) {
        console.warn("Diff apply patch: Cannot find key in original object", key, JSON.stringify(patch, null, 2));
        return null;
      } else {
        for (const nkey in patch) {
          if (nkey !== "___$toObject" && // @ts-ignore
          nestedApplyPatch(value[key], nkey, patch[nkey]) === null) {
            return null;
          }
        }
      }
    }
  }, "nestedApplyPatch");
  var applyArrayPatch = /* @__PURE__ */ __name((value, arrayPatch) => {
    const patchLength = arrayPatch.length;
    const newArray = new Array(arrayPatch[0]);
    let aI = -1;
    const patches = [];
    const used = {};
    for (let i2 = 1; i2 < patchLength; i2++) {
      const operation = arrayPatch[i2];
      const type = operation[0];
      if (type === 0) {
        for (let j = 1; j < operation.length; j++) {
          newArray[++aI] = operation[j];
        }
      } else if (type === 1) {
        const piv = operation[2];
        const range = operation[1] + piv;
        for (let j = piv; j < range; j++) {
          const t = typeof value[j];
          if (t === "object" && j in used) {
            const copy = deepCopy_default(value[j]);
            newArray[++aI] = copy;
          } else {
            if (t === "object") {
              used[j] = true;
            }
            newArray[++aI] = value[j];
          }
        }
      } else if (type === 2) {
        const piv = operation[1];
        const range = operation.length - 2 + piv;
        for (let j = piv; j < range; j++) {
          const op = [++aI, j, operation[j - piv + 2]];
          patches.push(op);
        }
      }
    }
    const len = patches.length;
    for (let i2 = 0; i2 < len; i2++) {
      const [aI2, j, patch] = patches[i2];
      const x = j in used ? deepCopy_default(value[j]) : value[j];
      const newObject = applyPatch(x, patch);
      if (newObject === null) {
        return null;
      }
      newArray[aI2] = newObject;
    }
    return newArray;
  }, "applyArrayPatch");
  var applyPatch = /* @__PURE__ */ __name((value, patch) => {
    if (patch) {
      if (patch.constructor === Array) {
        const type = patch[0];
        if (type === 0) {
          return patch[1];
        } else if (type === 1) {
          return void 0;
        } else if (type === 2) {
          return applyArrayPatch(value, patch[1]);
        }
      } else {
        if (patch.___$toObject && value && value.constructor === Array) {
          const v = {};
          for (let i2 = 0; i2 < value.length; i2++) {
            v[i2] = value[i2];
          }
          value = v;
        }
        for (const key in patch) {
          if (key !== "___$toObject") {
            const r = nestedApplyPatch(value, key, patch[key]);
            if (r === null) {
              return null;
            }
          }
        }
        return value;
      }
    } else {
      return value;
    }
  }, "applyPatch");
  var applyPatch_default = applyPatch;

  // node_modules/@based/client/dist/src/incoming/protocol.js
  var decodeHeader = /* @__PURE__ */ __name((nr) => {
    const len = nr >> 4;
    const meta2 = nr & 15;
    const type = meta2 >> 1;
    const isDeflate = meta2 & 1;
    return {
      type,
      isDeflate: isDeflate === 1,
      len
    };
  }, "decodeHeader");
  var parseArrayBuffer = /* @__PURE__ */ __name(async (d2) => {
    if (d2 instanceof Uint8Array) {
      return d2;
    }
    if (d2 instanceof ArrayBuffer) {
      return new Uint8Array(d2);
    }
    if (typeof window === "undefined") {
      if (d2 instanceof Buffer) {
        return new Uint8Array(d2);
      }
    }
    if (d2 instanceof Blob) {
      const buffer = await d2.arrayBuffer();
      return new Uint8Array(buffer);
    }
    throw new Error("432");
  }, "parseArrayBuffer");
  var requestFullData = /* @__PURE__ */ __name((client, id) => {
    const sub = client.observeState.get(id);
    addGetToQueue(client, sub.name, id, sub.payload);
  }, "requestFullData");

  // node_modules/@based/client/dist/src/getTargetInfo.js
  var getTargetInfo = /* @__PURE__ */ __name((client, id, type) => {
    const sub = type === "sub" ? client.observeState.get(id) : client.channelState.get(id);
    if (!sub) {
      return { name: `[Cannot find ${id}]`, id };
    }
    return sub.payload ? { name: sub.name, payload: sub.payload, id } : { name: sub.name, id };
  }, "getTargetInfo");

  // node_modules/@based/client/dist/src/cache.js
  var freeCacheMemory = /* @__PURE__ */ __name((client) => {
    client.cache.forEach((v, k) => {
      if (!client.observeState.has(k)) {
        client.cacheSize -= v.s;
        client.cache.delete(k);
        removeStorage(client, String(k));
      }
    });
  }, "freeCacheMemory");

  // node_modules/@based/errors/dist/src/BasedError.js
  var _BasedError = class _BasedError extends Error {
    constructor() {
      super(...arguments);
      __publicField(this, "statusMessage");
      __publicField(this, "code");
    }
  };
  __name(_BasedError, "BasedError");
  var BasedError = _BasedError;

  // node_modules/@based/errors/dist/src/types.js
  var BasedErrorCode;
  (function(BasedErrorCode2) {
    BasedErrorCode2[BasedErrorCode2["incorrectFieldType"] = 1e3] = "incorrectFieldType";
    BasedErrorCode2[BasedErrorCode2["incorrectNodeType"] = 1001] = "incorrectNodeType";
    BasedErrorCode2[BasedErrorCode2["exceedsMaximum"] = 1002] = "exceedsMaximum";
    BasedErrorCode2[BasedErrorCode2["subceedsMinimum"] = 1003] = "subceedsMinimum";
    BasedErrorCode2[BasedErrorCode2["fieldDoesNotExist"] = 1004] = "fieldDoesNotExist";
    BasedErrorCode2[BasedErrorCode2["incorrectFormat"] = 1005] = "incorrectFormat";
    BasedErrorCode2[BasedErrorCode2["referenceIsIncorrectType"] = 1006] = "referenceIsIncorrectType";
    BasedErrorCode2[BasedErrorCode2["valueAndDefault"] = 1007] = "valueAndDefault";
    BasedErrorCode2[BasedErrorCode2["defaultNotSupported"] = 1008] = "defaultNotSupported";
    BasedErrorCode2[BasedErrorCode2["multipleOperationsNotAllowed"] = 1009] = "multipleOperationsNotAllowed";
    BasedErrorCode2[BasedErrorCode2["requiredFieldNotDefined"] = 1010] = "requiredFieldNotDefined";
    BasedErrorCode2[BasedErrorCode2["languageNotSupported"] = 1011] = "languageNotSupported";
    BasedErrorCode2[BasedErrorCode2["invalidJSON"] = 1012] = "invalidJSON";
    BasedErrorCode2[BasedErrorCode2["noLanguageFound"] = 1013] = "noLanguageFound";
    BasedErrorCode2[BasedErrorCode2["cannotDeleteNodeFromModify"] = 1014] = "cannotDeleteNodeFromModify";
    BasedErrorCode2[BasedErrorCode2["nestedModifyObjectNotAllowed"] = 1015] = "nestedModifyObjectNotAllowed";
    BasedErrorCode2[BasedErrorCode2["infinityNotSupported"] = 1016] = "infinityNotSupported";
    BasedErrorCode2[BasedErrorCode2["invalidSchemaFormat"] = 1017] = "invalidSchemaFormat";
    BasedErrorCode2[BasedErrorCode2["invalidProperty"] = 1018] = "invalidProperty";
    BasedErrorCode2[BasedErrorCode2["FunctionError"] = 50001] = "FunctionError";
    BasedErrorCode2[BasedErrorCode2["AuthorizeFunctionError"] = 50002] = "AuthorizeFunctionError";
    BasedErrorCode2[BasedErrorCode2["NoOservableCacheAvailable"] = 50003] = "NoOservableCacheAvailable";
    BasedErrorCode2[BasedErrorCode2["ObservableFunctionError"] = 50004] = "ObservableFunctionError";
    BasedErrorCode2[BasedErrorCode2["ObserveCallbackError"] = 50005] = "ObserveCallbackError";
    BasedErrorCode2[BasedErrorCode2["FunctionNotFound"] = 40401] = "FunctionNotFound";
    BasedErrorCode2[BasedErrorCode2["FunctionIsNotObservable"] = 40402] = "FunctionIsNotObservable";
    BasedErrorCode2[BasedErrorCode2["FunctionIsObservable"] = 40403] = "FunctionIsObservable";
    BasedErrorCode2[BasedErrorCode2["FunctionIsStream"] = 40404] = "FunctionIsStream";
    BasedErrorCode2[BasedErrorCode2["CannotStreamToObservableFunction"] = 40405] = "CannotStreamToObservableFunction";
    BasedErrorCode2[BasedErrorCode2["FunctionIsWrongType"] = 40406] = "FunctionIsWrongType";
    BasedErrorCode2[BasedErrorCode2["AuthorizeRejectedError"] = 40301] = "AuthorizeRejectedError";
    BasedErrorCode2[BasedErrorCode2["InvalidPayload"] = 40001] = "InvalidPayload";
    BasedErrorCode2[BasedErrorCode2["PayloadTooLarge"] = 40002] = "PayloadTooLarge";
    BasedErrorCode2[BasedErrorCode2["ChunkTooLarge"] = 40003] = "ChunkTooLarge";
    BasedErrorCode2[BasedErrorCode2["UnsupportedContentEncoding"] = 40004] = "UnsupportedContentEncoding";
    BasedErrorCode2[BasedErrorCode2["NoBinaryProtocol"] = 40005] = "NoBinaryProtocol";
    BasedErrorCode2[BasedErrorCode2["LengthRequired"] = 41101] = "LengthRequired";
    BasedErrorCode2[BasedErrorCode2["MethodNotAllowed"] = 40501] = "MethodNotAllowed";
    BasedErrorCode2[BasedErrorCode2["RateLimit"] = 40029] = "RateLimit";
    BasedErrorCode2[BasedErrorCode2["MissingAuthStateProtocolHeader"] = 40030] = "MissingAuthStateProtocolHeader";
    BasedErrorCode2[BasedErrorCode2["IncorrectAccessKey"] = 40031] = "IncorrectAccessKey";
    BasedErrorCode2[BasedErrorCode2["Block"] = 90001] = "Block";
    BasedErrorCode2[BasedErrorCode2["PrefixAlreadyInUse"] = 2e3] = "PrefixAlreadyInUse";
    BasedErrorCode2[BasedErrorCode2["CannotChangeFieldInStrictMode"] = 2001] = "CannotChangeFieldInStrictMode";
    BasedErrorCode2[BasedErrorCode2["CannotRemoveFieldInStrictMode"] = 2002] = "CannotRemoveFieldInStrictMode";
    BasedErrorCode2[BasedErrorCode2["CannotMutateWithExistingData"] = 2003] = "CannotMutateWithExistingData";
    BasedErrorCode2[BasedErrorCode2["CannotDeleteRoot"] = 2004] = "CannotDeleteRoot";
    BasedErrorCode2[BasedErrorCode2["CannotChangeDefaultField"] = 2005] = "CannotChangeDefaultField";
    BasedErrorCode2[BasedErrorCode2["CannotRemoveLastProperty"] = 2006] = "CannotRemoveLastProperty";
  })(BasedErrorCode = BasedErrorCode || (BasedErrorCode = {}));

  // node_modules/@based/errors/dist/src/convertDataToBasedError.js
  var convertDataToBasedError = /* @__PURE__ */ __name((payload, stack) => {
    if (!payload || typeof payload !== "object") {
      const err2 = new BasedError(`Payload: ${payload}`);
      err2.name = "Invalid returned payload";
      return err2;
    }
    const { message, code } = payload;
    const msg = message ? message[0] === "[" ? message : `[${BasedErrorCode[code]}] ` + message : !code ? JSON.stringify(payload, null, 2) : "Cannot read error msg";
    const error = new BasedError(msg);
    error.stack = stack ? msg + " " + stack : msg;
    error.name = BasedErrorCode[code];
    error.code = code;
    return error;
  }, "convertDataToBasedError");

  // node_modules/@based/client/dist/src/incoming/forceReload.js
  var cacheId = "/-74rxe8kzryxek07e36yr";
  var forceReload = /* @__PURE__ */ __name((client, type, seqId) => {
    if (client.lastForceId === seqId) {
      return;
    }
    client.lastForceId = seqId;
    if (typeof window !== "undefined") {
      if (type === 1 || type === 0) {
        const r = cacheId + seqId;
        let p = location.pathname;
        while (p.endsWith("/")) {
          p = p.slice(0, -1);
        }
        location.pathname = p + r;
      }
    } else {
      if (type === 2 || type === 0) {
        client.disconnect();
        setTimeout(() => {
          client.connect();
        }, 100);
      }
    }
  }, "forceReload");

  // node_modules/@based/protocol/dist/db-read/types.js
  var ReaderSchemaEnum;
  (function(ReaderSchemaEnum2) {
    ReaderSchemaEnum2[ReaderSchemaEnum2["edge"] = 1] = "edge";
    ReaderSchemaEnum2[ReaderSchemaEnum2["default"] = 2] = "default";
    ReaderSchemaEnum2[ReaderSchemaEnum2["single"] = 3] = "single";
    ReaderSchemaEnum2[ReaderSchemaEnum2["rootProps"] = 4] = "rootProps";
  })(ReaderSchemaEnum || (ReaderSchemaEnum = {}));
  var ReaderMeta;
  (function(ReaderMeta2) {
    ReaderMeta2[ReaderMeta2["only"] = 1] = "only";
    ReaderMeta2[ReaderMeta2["combined"] = 2] = "combined";
  })(ReaderMeta || (ReaderMeta = {}));
  var READ_ID = 255;
  var READ_EDGE = 252;
  var READ_REFERENCES = 253;
  var READ_REFERENCE = 254;
  var READ_AGGREGATION = 250;
  var READ_META = 249;
  var AggregateType;
  (function(AggregateType2) {
    AggregateType2[AggregateType2["SUM"] = 1] = "SUM";
    AggregateType2[AggregateType2["COUNT"] = 2] = "COUNT";
    AggregateType2[AggregateType2["CARDINALITY"] = 3] = "CARDINALITY";
    AggregateType2[AggregateType2["STDDEV"] = 4] = "STDDEV";
    AggregateType2[AggregateType2["AVERAGE"] = 5] = "AVERAGE";
    AggregateType2[AggregateType2["VARIANCE"] = 6] = "VARIANCE";
    AggregateType2[AggregateType2["MAX"] = 7] = "MAX";
    AggregateType2[AggregateType2["MIN"] = 8] = "MIN";
    AggregateType2[AggregateType2["HMEAN"] = 9] = "HMEAN";
  })(AggregateType || (AggregateType = {}));
  var COMPRESSED = 1;
  var NOT_COMPRESSED = 0;
  var PROPERTY_BIT_MAP = {
    meta: 1 << 0,
    enum: 1 << 1,
    vectorBaseType: 1 << 2,
    len: 1 << 3,
    locales: 1 << 4
  };
  var DEF_BIT_MAP = {
    search: 1 << 0,
    refs: 1 << 1,
    props: 1 << 2,
    main: 1 << 3,
    edges: 1 << 4,
    hook: 1 << 5,
    aggregate: 1 << 6
  };
  var GROUP_BY_BIT_MAP = {
    stepRange: 1 << 0,
    stepType: 1 << 1,
    display: 1 << 2,
    enum: 1 << 3
  };

  // node_modules/@based/schema/dist/def/typeIndexes.js
  var TIMESTAMP = 1;
  var NUMBER = 4;
  var CARDINALITY = 5;
  var INT8 = 20;
  var UINT8 = 6;
  var INT16 = 21;
  var UINT16 = 22;
  var INT32 = 23;
  var UINT32 = 7;
  var BOOLEAN = 9;
  var ENUM = 10;
  var STRING = 11;
  var TEXT = 12;
  var REFERENCE = 13;
  var REFERENCES = 14;
  var ALIAS = 18;
  var BINARY = 25;
  var VECTOR = 27;
  var JSON2 = 28;
  var COLVEC = 30;
  var VectorBaseType;
  (function(VectorBaseType2) {
    VectorBaseType2[VectorBaseType2["Int8"] = 1] = "Int8";
    VectorBaseType2[VectorBaseType2["Uint8"] = 2] = "Uint8";
    VectorBaseType2[VectorBaseType2["Int16"] = 3] = "Int16";
    VectorBaseType2[VectorBaseType2["Uint16"] = 4] = "Uint16";
    VectorBaseType2[VectorBaseType2["Int32"] = 5] = "Int32";
    VectorBaseType2[VectorBaseType2["Uint32"] = 6] = "Uint32";
    VectorBaseType2[VectorBaseType2["Float32"] = 7] = "Float32";
    VectorBaseType2[VectorBaseType2["Float64"] = 8] = "Float64";
  })(VectorBaseType || (VectorBaseType = {}));
  var isNumberType = /* @__PURE__ */ __name((type) => {
    return type === NUMBER || type === UINT16 || type === UINT32 || type === INT16 || type === INT32 || type == UINT8 || type === INT8 || type === CARDINALITY;
  }, "isNumberType");

  // node_modules/@based/protocol/dist/db-read/aggregate.js
  var readNumber = /* @__PURE__ */ __name((value, offset, type) => {
    switch (type) {
      case NUMBER:
        return readDoubleLE(value, offset);
      case UINT16:
        return readUint16(value, offset);
      case UINT32:
        return readUint32(value, offset);
      case INT16:
        return readInt16(value, offset);
      case INT32:
        return readInt32(value, offset);
      case UINT8:
        return value[offset];
      case INT8:
        return value[offset];
    }
  }, "readNumber");
  var readAggregate = /* @__PURE__ */ __name((q, result, offset, len) => {
    const results = {};
    if (q.aggregate.groupBy) {
      let i2 = offset;
      while (i2 < len) {
        let key = "";
        let keyLen = 0;
        if (result[i2] == 0) {
          key = `$undefined`;
          i2 += 2;
        } else {
          if (q.aggregate.groupBy.typeIndex == ENUM) {
            i2 += 2;
            key = q.aggregate.groupBy.enum[result[i2] - 1];
            i2++;
          } else if (isNumberType(q.aggregate.groupBy.typeIndex)) {
            keyLen = readUint16(result, i2);
            i2 += 2;
            key = readNumber(result, i2, q.aggregate.groupBy.typeIndex);
            i2 += keyLen;
          } else if (q.aggregate.groupBy.typeIndex == TIMESTAMP && q.aggregate.groupBy.stepType) {
            keyLen = readUint16(result, i2);
            i2 += 2;
            key = readNumber(result, i2, INT32);
            i2 += keyLen;
          } else if (q.aggregate.groupBy.typeIndex == TIMESTAMP && q.aggregate.groupBy.stepRange !== 0) {
            keyLen = readUint16(result, i2);
            i2 += 2;
            if (!q.aggregate?.groupBy?.display) {
              key = readInt64(result, i2).toString();
            } else if (q.aggregate?.groupBy?.stepRange > 0) {
              const dtFormat = q.aggregate?.groupBy.display;
              let v = readInt64(result, i2);
              key = dtFormat.formatRange(v, v + q.aggregate?.groupBy.stepRange * 1e3);
            } else {
              const dtFormat = q.aggregate?.groupBy.display;
              key = dtFormat.format(readInt64(result, i2));
            }
            i2 += keyLen;
          } else if (q.aggregate.groupBy.typeIndex == REFERENCE) {
            keyLen = readUint16(result, i2);
            i2 += 2;
            key = readNumber(result, i2, INT32);
            i2 += keyLen;
          } else {
            keyLen = readUint16(result, i2);
            i2 += 2;
            key = DECODER.decode(result.subarray(i2, i2 + keyLen));
            i2 += keyLen;
          }
        }
        const resultKey = results[key] = {};
        for (const agg of q.aggregate.aggregates) {
          var val = void 0;
          if (agg.type === AggregateType.CARDINALITY || agg.type === AggregateType.COUNT) {
            val = readUint32(result, agg.resultPos + i2);
          } else {
            val = readDoubleLE(result, agg.resultPos + i2);
          }
          if (agg.type === AggregateType.COUNT) {
            setByPath(resultKey, agg.path, val);
          } else {
            setByPath(resultKey, [...agg.path, AggregateType[agg.type].toLowerCase()], val);
          }
        }
        i2 += q.aggregate.totalResultsSize;
      }
    } else {
      for (const agg of q.aggregate.aggregates) {
        var val = void 0;
        if (agg.type === AggregateType.CARDINALITY || agg.type === AggregateType.COUNT) {
          val = readUint32(result, agg.resultPos + offset);
        } else {
          val = readDoubleLE(result, agg.resultPos + offset);
        }
        if (agg.type === AggregateType.COUNT) {
          setByPath(results, agg.path, val);
        } else if (agg.path.length > 1 && agg.path[1][0] == "$") {
          setByPath(results, [agg.path[1], AggregateType[agg.type].toLowerCase()], val);
        } else {
          setByPath(results, [...agg.path, AggregateType[agg.type].toLowerCase()], val);
        }
      }
    }
    return results;
  }, "readAggregate");

  // node_modules/@based/protocol/dist/db-read/meta.js
  var readMetaSeperate = /* @__PURE__ */ __name((result, i2) => {
    const compressed = result[i2] === 1;
    const crc32 = readUint32(result, i2 + 1);
    const size = readUint32(result, i2 + 5) - 6;
    const checksum = combineToNumber(crc32, size);
    return { checksum, size, crc32, compressed };
  }, "readMetaSeperate");
  var readMetaMainString = /* @__PURE__ */ __name((result, i2, len) => {
    const crc32 = crc32c_default(result.subarray(i2, i2 + len));
    const checksum = combineToNumber(crc32, len);
    return { checksum, size: len, crc32, compressed: false };
  }, "readMetaMainString");
  var emptyMeta = /* @__PURE__ */ __name(() => {
    return {
      checksum: 0,
      size: 0,
      crc32: 0,
      compressed: false
    };
  }, "emptyMeta");

  // node_modules/@based/protocol/dist/db-read/addProps.js
  var addLangProp = /* @__PURE__ */ __name((p, value, item, lang) => {
    const path = p.path;
    let langs;
    const len = path.length - 1;
    let select = item;
    for (let i2 = 0; i2 <= len; i2++) {
      const field = path[i2];
      if (i2 === len) {
        if (!(field in select)) {
          select[field] = langs = {};
          for (const lang2 in p.locales) {
            const str = p.locales[lang2];
            langs[str] = "";
          }
        } else {
          langs = select[field];
        }
      } else {
        select = select[field] ?? (select[field] = {});
      }
    }
    if (p.meta) {
      langs[p.locales[lang]].value = value;
    } else {
      langs[p.locales[lang]] = value;
    }
  }, "addLangProp");
  var addLangMetaProp = /* @__PURE__ */ __name((p, meta2, item, lang) => {
    const path = p.path;
    let langs;
    const len = path.length - 1;
    let select = item;
    for (let i2 = 0; i2 <= len; i2++) {
      const field = path[i2];
      if (i2 === len) {
        if (!(field in select)) {
          select[field] = langs = {};
          for (const lang2 in p.locales) {
            const str = p.locales[lang2];
            const meta3 = emptyMeta();
            if (p.meta === ReaderMeta.combined) {
              meta3.value = "";
            }
            langs[str] = meta3;
          }
        } else {
          langs = select[field];
        }
      } else {
        select = select[field] ?? (select[field] = {});
      }
    }
    langs[p.locales[lang]] = meta2;
  }, "addLangMetaProp");
  var addProp = /* @__PURE__ */ __name((p, value, item) => {
    const path = p.path;
    const len = path.length - 1;
    let select = item;
    for (let i2 = 0; i2 <= len; i2++) {
      const field = path[i2];
      if (i2 === len) {
        if (p.meta) {
          select[field].value = value;
        } else {
          select[field] = value;
        }
      } else {
        select = select[field] ?? (select[field] = {});
      }
    }
  }, "addProp");
  var addMetaProp = /* @__PURE__ */ __name((p, meta2, item) => {
    const path = p.path;
    const len = path.length - 1;
    let select = item;
    for (let i2 = 0; i2 <= len; i2++) {
      const field = path[i2];
      if (i2 === len) {
        select[field] = meta2;
        if (p.meta === ReaderMeta.combined) {
          meta2.value = "";
        }
      } else {
        select = select[field] ?? (select[field] = {});
      }
    }
  }, "addMetaProp");

  // node_modules/@based/protocol/dist/db-read/string.js
  var tmpBuffer = new Uint8Array(4096);
  var getTmpBuffer = /* @__PURE__ */ __name((len) => {
    if (len > tmpBuffer.byteLength) {
      tmpBuffer = new Uint8Array(len);
    }
    if (len === tmpBuffer.byteLength) {
      return tmpBuffer;
    }
    return tmpBuffer.subarray(0, len);
  }, "getTmpBuffer");
  var inflate = global.__basedDb__native__ ? global.__basedDb__native__.decompress : (input, output, offset, len) => {
    return inflateSync(input.subarray(offset, offset + len), { out: output });
  };
  var readString = /* @__PURE__ */ __name((val, offset, len, strippedCrc32) => {
    const type = val[offset + 1];
    if (type == COMPRESSED) {
      const origSize = readUint32(val, offset + 2);
      const newBuffer = getTmpBuffer(origSize);
      inflate(val, newBuffer, offset + 6, strippedCrc32 ? len - 2 : len - 6);
      return DECODER.decode(newBuffer);
    } else if (type == NOT_COMPRESSED) {
      if (strippedCrc32) {
        return DECODER.decode(val.subarray(offset + 2, len + offset));
      } else {
        return DECODER.decode(val.subarray(offset + 2, len + offset - 4));
      }
    }
    return "";
  }, "readString");

  // node_modules/@based/protocol/dist/db-read/vector.js
  var readVector = /* @__PURE__ */ __name((prop, tmp) => {
    switch (prop.vectorBaseType) {
      case VectorBaseType.Int8:
        return new Int8Array(tmp.buffer, tmp.byteOffset, tmp.byteLength);
      case VectorBaseType.Uint8:
        return tmp;
      case VectorBaseType.Int16:
        return new Int16Array(tmp.buffer);
      case VectorBaseType.Uint16:
        return new Uint16Array(tmp.buffer);
      case VectorBaseType.Int32:
        return new Int32Array(tmp.buffer);
      case VectorBaseType.Uint32:
        return new Uint32Array(tmp.buffer);
      case VectorBaseType.Float32:
        return new Float32Array(tmp.buffer);
      case VectorBaseType.Float64:
        return new Float64Array(tmp.buffer);
    }
  }, "readVector");

  // node_modules/@based/protocol/dist/db-read/prop.js
  var readStringProp = /* @__PURE__ */ __name((prop, buf, offset, size) => {
    if (prop.typeIndex === TEXT || prop.typeIndex === STRING || prop.typeIndex === ALIAS) {
      return readString(buf, offset, size, true);
    }
    if (prop.typeIndex === JSON2) {
      return global.JSON.parse(readString(buf, offset, size, true));
    }
    if (prop.typeIndex === BINARY) {
      return buf.subarray(offset + 2, size + offset);
    }
  }, "readStringProp");
  var readProp = /* @__PURE__ */ __name((instruction, q, result, i2, item) => {
    const prop = q.props[instruction];
    prop.readBy = q.readId;
    if (prop.typeIndex === CARDINALITY) {
      const size = readUint32(result, i2);
      addProp(prop, readUint32(result, i2 + 4), item);
      i2 += size + 4;
    } else if (prop.typeIndex === JSON2) {
      const size = readUint32(result, i2);
      addProp(prop, readStringProp(prop, result, i2 + 4, size), item);
      i2 += size + 4;
    } else if (prop.typeIndex === BINARY) {
      const size = readUint32(result, i2);
      addProp(prop, readStringProp(prop, result, i2 + 4, size), item);
      i2 += size + 4;
    } else if (prop.typeIndex === STRING) {
      const size = readUint32(result, i2);
      addProp(prop, readStringProp(prop, result, i2 + 4, size), item);
      i2 += size + 4;
    } else if (prop.typeIndex == TEXT) {
      const size = readUint32(result, i2);
      if (size === 0) {
      } else {
        if (!prop.locales) {
          addProp(prop, readString(result, i2 + 4, size, true), item);
        } else {
          addLangProp(prop, readString(result, i2 + 4, size, true), item, result[i2 + 4]);
        }
      }
      i2 += size + 4;
    } else if (prop.typeIndex === ALIAS) {
      const size = readUint32(result, i2);
      i2 += 4;
      if (size === 0) {
        addProp(prop, "", item);
      } else {
        const string = readUtf8(result, i2, size);
        i2 += size;
        addProp(prop, string, item);
      }
    } else if (prop.typeIndex === VECTOR || prop.typeIndex === COLVEC) {
      const tmp = result.slice(i2, i2 + prop.len);
      addProp(prop, readVector(prop, tmp), item);
      i2 += prop.len;
    }
    return i2;
  }, "readProp");

  // node_modules/@based/protocol/dist/db-read/main.js
  var readMainValue = /* @__PURE__ */ __name((prop, result, i2, item) => {
    const typeIndex = prop.typeIndex;
    if (typeIndex === TIMESTAMP) {
      addProp(prop, readInt64(result, i2), item);
    } else if (typeIndex === NUMBER) {
      addProp(prop, readDoubleLE(result, i2), item);
    } else if (typeIndex === UINT32) {
      addProp(prop, readUint32(result, i2), item);
    } else if (typeIndex === BOOLEAN) {
      addProp(prop, Boolean(result[i2]), item);
    } else if (typeIndex === ENUM) {
      if (result[i2] === 0) {
        addProp(prop, void 0, item);
      } else {
        addProp(prop, prop.enum[result[i2] - 1], item);
      }
    } else if (typeIndex === STRING) {
      const len = result[i2];
      i2++;
      const value = len === 0 ? "" : readUtf8(result, i2, len);
      if (prop.meta) {
        if (prop.meta === ReaderMeta.combined) {
          addMetaProp(prop, readMetaMainString(result, i2, len), item);
          addProp(prop, value, item);
        } else {
          addMetaProp(prop, readMetaMainString(result, i2, len), item);
        }
      } else {
        addProp(prop, value, item);
      }
    } else if (typeIndex === JSON2) {
      const len = result[i2];
      i2++;
      const value = len === 0 ? null : global.JSON.parse(readUtf8(result, i2, len));
      addProp(prop, value, item);
    } else if (typeIndex === BINARY) {
      const len = result[i2];
      i2++;
      const value = len === 0 ? new Uint8Array(0) : result.subarray(i2, i2 + len);
      addProp(prop, value, item);
    } else if (typeIndex === INT8) {
      const signedVal = result[i2] << 24 >> 24;
      addProp(prop, signedVal, item);
    } else if (typeIndex === UINT8) {
      addProp(prop, result[i2], item);
    } else if (typeIndex === INT16) {
      addProp(prop, readInt16(result, i2), item);
    } else if (typeIndex === UINT16) {
      addProp(prop, readUint16(result, i2), item);
    } else if (typeIndex === INT32) {
      addProp(prop, readInt32(result, i2), item);
    }
  }, "readMainValue");
  var readMain = /* @__PURE__ */ __name((q, result, i2, item) => {
    const mainInclude = q.main;
    for (const k in mainInclude.props) {
      const prop = mainInclude.props[k];
      readMainValue(prop, result, Number(k) + i2, item);
    }
    i2 += mainInclude.len;
    return i2;
  }, "readMain");

  // node_modules/@based/protocol/dist/db-read/undefined.js
  var undefinedValue = /* @__PURE__ */ __name((prop) => {
    const typeIndex = prop.typeIndex;
    if (typeIndex === STRING || typeIndex === ALIAS) {
      return "";
    }
    if (typeIndex === JSON2) {
      return null;
    }
    if (typeIndex === BINARY) {
      return new Uint8Array();
    }
    if (typeIndex === CARDINALITY) {
      return 0;
    }
    if (typeIndex === REFERENCES) {
      return [];
    }
    if (typeIndex === REFERENCE) {
      return null;
    }
    if (typeIndex === VECTOR) {
      return readVector(prop, new Uint8Array());
    }
    if (typeIndex === TEXT) {
      if (prop.locales) {
        const codes = {};
        for (const code in prop.locales) {
          codes[prop.locales[code]] = "";
        }
        return codes;
      } else {
        return "";
      }
    }
    return void 0;
  }, "undefinedValue");
  var undefinedProps = /* @__PURE__ */ __name((q, item) => {
    for (const k in q.props) {
      const p = q.props[k];
      if (p.readBy !== q.readId) {
        p.readBy = q.readId;
        if (p.meta) {
          if (p.typeIndex === TEXT && p.locales) {
            for (const code in p.locales) {
              const meta2 = emptyMeta();
              if (p.meta === ReaderMeta.combined) {
                meta2.value = "";
              }
              addLangMetaProp(p, meta2, item, Number(code));
            }
          } else {
            const meta2 = emptyMeta();
            if (p.meta === ReaderMeta.combined) {
              meta2.value = undefinedValue(p);
            }
            addMetaProp(p, meta2, item);
          }
        } else {
          addProp(p, undefinedValue(p), item);
        }
      }
    }
  }, "undefinedProps");

  // node_modules/@based/protocol/dist/db-read/schema/deserialize.js
  var readPath = /* @__PURE__ */ __name((p, off) => {
    const len = p[off];
    const path = new Array(len);
    let index = 1 + off;
    let cnt = 0;
    while (cnt != len) {
      const len2 = p[index];
      path[cnt] = DECODER.decode(p.subarray(index + 1, len2 + index + 1));
      index += len2 + 1;
      cnt++;
    }
    return { path, size: index - off };
  }, "readPath");
  var deserializeAggregate = /* @__PURE__ */ __name((p, off) => {
    let index = off;
    const agg = {
      type: p[index],
      resultPos: readUint32(p, index + 1),
      path: []
    };
    index += 5;
    const { size, path } = readPath(p, index);
    agg.path = path;
    index += size;
    return { agg, size: index - off };
  }, "deserializeAggregate");
  var deserializeAggregates = /* @__PURE__ */ __name((p, off) => {
    const aggs = p[off];
    const totalResultsSize = readUint32(p, off + 1);
    let index = off + 5;
    let count = 0;
    const result = {
      aggregates: [],
      totalResultsSize
    };
    while (count != aggs) {
      const { agg, size } = deserializeAggregate(p, index);
      result.aggregates.push(agg);
      index += size;
      count++;
    }
    const hasGroup = p[index];
    index++;
    if (hasGroup) {
      const opts = p[index];
      const groupBy = {
        typeIndex: p[index + 1]
      };
      index += 2;
      if (opts & GROUP_BY_BIT_MAP.stepRange) {
        groupBy.stepRange = readDoubleLE(p, index);
        index += 8;
      }
      if (opts & GROUP_BY_BIT_MAP.stepType) {
        groupBy.stepType = true;
      }
      if (opts & GROUP_BY_BIT_MAP.display) {
        groupBy.stepType = true;
        const size = readUint16(p, index);
        index += 2;
        const tmp = JSON.parse(DECODER.decode(p.subarray(index, index + size)));
        groupBy.display = new Intl.DateTimeFormat(tmp.locale, tmp);
        index += size;
      }
      if (opts & GROUP_BY_BIT_MAP.enum) {
        const useJSON = p[index] === 1;
        index += 1;
        if (useJSON) {
          const size = readUint16(p, index);
          index += 2;
          groupBy.enum = JSON.parse(DECODER.decode(p.subarray(index, index + size)));
          index += size;
        } else {
          const len = p[index];
          index++;
          let cnt = 0;
          groupBy.enum = new Array(len);
          while (cnt !== len) {
            const len2 = p[index];
            groupBy.enum[cnt] = DECODER.decode(p.subarray(index + 1, len2 + index + 1));
            index += len2 + 1;
            cnt++;
          }
        }
      }
      result.groupBy = groupBy;
    }
    return { agg: result, size: index - off };
  }, "deserializeAggregates");
  var deSerializeProp = /* @__PURE__ */ __name((p, off, keySize) => {
    const key = keySize === 1 ? p[off] : readUint16(p, off);
    const map = p[off + keySize + 1];
    const path = readPath(p, off + 2 + keySize);
    const prop = {
      typeIndex: p[off + keySize],
      path: path.path,
      readBy: 0
    };
    let index = keySize + 2 + off + path.size;
    if (map & PROPERTY_BIT_MAP.meta) {
      prop.meta = p[index];
      index++;
    }
    if (map & PROPERTY_BIT_MAP.enum) {
      const useJSON = p[index] === 1;
      index += 1;
      if (useJSON) {
        const size = readUint16(p, index);
        index += 2;
        prop.enum = JSON.parse(DECODER.decode(p.subarray(index, index + size)));
        index += size;
      } else {
        const len = p[index];
        index++;
        let cnt = 0;
        prop.enum = new Array(len);
        while (cnt !== len) {
          const len2 = p[index];
          prop.enum[cnt] = DECODER.decode(p.subarray(index + 1, len2 + index + 1));
          index += len2 + 1;
          cnt++;
        }
      }
    }
    if (map & PROPERTY_BIT_MAP.vectorBaseType) {
      prop.vectorBaseType = p[index] + 1;
      index++;
    }
    if (map & PROPERTY_BIT_MAP.len) {
      prop.len = readUint16(p, index);
      index += 2;
    }
    if (map & PROPERTY_BIT_MAP.locales) {
      prop.locales = {};
      const end = p[index] * 4 + index + 1;
      index++;
      while (index < end) {
        prop.locales[readUint16(p, index)] = DECODER.decode(p.subarray(index + 2, index + 4));
        index += 4;
      }
    }
    return { def: prop, key, size: index - off };
  }, "deSerializeProp");
  var deSerializeSchemaInner = /* @__PURE__ */ __name((schema, offset = 0) => {
    let i2 = offset;
    const map = schema[i2 + 1];
    const s = {
      readId: 0,
      type: schema[i2],
      search: (map & DEF_BIT_MAP.search) !== 0,
      refs: {},
      props: {},
      main: { len: 0, props: {} }
    };
    i2 += 2;
    if (map & DEF_BIT_MAP.refs) {
      const ref = schema[i2];
      i2++;
      let count = 0;
      while (count != ref) {
        const { def, key, size } = deSerializeProp(schema, i2, 1);
        s.refs[key] = { prop: def };
        i2 += size;
        const x = deSerializeSchemaInner(schema, i2);
        s.refs[key].schema = x.schema;
        i2 += x.size;
        count++;
      }
    }
    if (map & DEF_BIT_MAP.props) {
      const propsLen = schema[i2];
      i2++;
      let count = 0;
      while (count != propsLen) {
        const { def, key, size } = deSerializeProp(schema, i2, 1);
        s.props[key] = def;
        i2 += size;
        count++;
      }
    }
    if (map & DEF_BIT_MAP.main) {
      const mainLen = readUint16(schema, i2);
      i2 += 2;
      if (mainLen) {
        let count = 0;
        const mainPropsLen = readUint16(schema, i2);
        s.main.len = mainLen;
        const keySize = mainLen > 255 ? 2 : 1;
        i2 += 2;
        while (count != mainPropsLen) {
          const { def, key, size } = deSerializeProp(schema, i2, keySize);
          s.main.props[key] = def;
          i2 += size;
          count++;
        }
      }
    }
    if (map & DEF_BIT_MAP.edges) {
      const x = deSerializeSchemaInner(schema, i2);
      s.edges = x.schema;
      i2 += x.size;
    }
    if (map & DEF_BIT_MAP.hook) {
      const len = readUint16(schema, i2);
      i2 += 2;
      const fn = `return (${DECODER.decode(schema.subarray(i2, i2 + len))})(n);`;
      s.hook = new Function("n", fn);
      i2 += len;
    }
    if (map & DEF_BIT_MAP.aggregate) {
      const { agg, size } = deserializeAggregates(schema, i2);
      s.aggregate = agg;
      i2 += size;
    }
    return { schema: s, size: i2 - offset };
  }, "deSerializeSchemaInner");
  var deSerializeSchema = /* @__PURE__ */ __name((schema, offset = 0) => {
    return deSerializeSchemaInner(schema, offset).schema;
  }, "deSerializeSchema");

  // node_modules/@based/protocol/dist/db-read/read.js
  var meta = /* @__PURE__ */ __name((q, result, i2, item) => {
    const field = result[i2];
    i2++;
    const prop = q.props[field];
    const lang = result[i2];
    i2++;
    prop.readBy = q.readId;
    if (prop.typeIndex === TEXT && prop.locales) {
      addLangMetaProp(prop, readMetaSeperate(result, i2), item, lang);
    } else {
      addMetaProp(prop, readMetaSeperate(result, i2), item);
    }
    i2 += 9;
    return i2;
  }, "meta");
  var aggregation = /* @__PURE__ */ __name((q, result, i2, item) => {
    let field = result[i2];
    i2++;
    const size = readUint32(result, i2);
    i2 += 4;
    const ref = q.refs[field];
    const def = ref.prop;
    addProp(def, readAggregate(ref.schema, result, i2, i2 + size), item);
    i2 += size;
    return i2;
  }, "aggregation");
  var reference = /* @__PURE__ */ __name((q, result, i2, item) => {
    const field = result[i2];
    i2++;
    const size = readUint32(result, i2);
    i2 += 4;
    const ref = q.refs[field];
    if (size === 0) {
      addProp(ref.prop, null, item);
      i2 += size;
    } else {
      i2++;
      const id = readUint32(result, i2);
      i2 += 4;
      const refItem = { id };
      readProps(ref.schema, result, i2, size + i2 - 5, refItem);
      addProp(ref.prop, refItem, item);
      i2 += size - 5;
    }
    return i2;
  }, "reference");
  var references = /* @__PURE__ */ __name((q, result, i2, item) => {
    const field = result[i2];
    i2++;
    const ref = q.refs[field];
    const size = readUint32(result, i2);
    i2 += 4;
    const refs = resultToObject(ref.schema, result, size + i2 + 4, i2);
    addProp(ref.prop, refs, item);
    i2 += size + 4;
    return i2;
  }, "references");
  var edge = /* @__PURE__ */ __name((q, result, i2, item) => {
    return readInstruction(result[i2], q.edges, result, i2 + 1, item);
  }, "edge");
  var readInstruction = /* @__PURE__ */ __name((instruction, q, result, i2, item) => {
    if (instruction === READ_META) {
      return meta(q, result, i2, item);
    } else if (instruction === READ_AGGREGATION) {
      return aggregation(q, result, i2, item);
    } else if (instruction === READ_REFERENCE) {
      return reference(q, result, i2, item);
    } else if (instruction === READ_REFERENCES) {
      return references(q, result, i2, item);
    } else if (instruction === READ_EDGE) {
      return edge(q, result, i2, item);
    } else if (instruction === 0) {
      return readMain(q, result, i2, item);
    } else {
      return readProp(instruction, q, result, i2, item);
    }
  }, "readInstruction");
  var readProps = /* @__PURE__ */ __name((q, result, offset, end, item) => {
    q.readId ^= 1;
    let i2 = offset;
    while (i2 < end) {
      const instruction = result[i2];
      i2++;
      if (instruction === READ_ID) {
        undefinedProps(q, item);
        return i2 - offset;
      }
      i2 = readInstruction(instruction, q, result, i2, item);
    }
    undefinedProps(q, item);
  }, "readProps");
  var resultToObject = /* @__PURE__ */ __name((q, result, end, offset = 0) => {
    if (q.aggregate) {
      return readAggregate(q, result, 0, result.byteLength - 4);
    }
    const len = readUint32(result, offset);
    if (len === 0) {
      if (q.type === ReaderSchemaEnum.single) {
        return null;
      }
      return [];
    }
    let items = [];
    let i2 = 5 + offset;
    const readHook = q.hook;
    while (i2 < end) {
      const id = readUint32(result, i2);
      i2 += 4;
      let item = { id };
      if (q.search) {
        item.$searchScore = readFloatLE(result, i2);
        i2 += 4;
      }
      const l2 = readProps(q, result, i2, end, item);
      i2 += l2;
      if (readHook) {
        const res = readHook(item);
        if (res === null) {
          continue;
        }
        items.push(res || item);
      } else {
        items.push(item);
      }
    }
    if (q.type === ReaderSchemaEnum.rootProps) {
      delete items[0].id;
      return items[0];
    } else if (q.type === ReaderSchemaEnum.single) {
      return items[0];
    }
    return items;
  }, "resultToObject");

  // node_modules/@based/client/dist/src/incoming/parseIncomingData.js
  var Decoder = new TextDecoder();
  var parseIncomingData = /* @__PURE__ */ __name((contentType, buf) => {
    if (contentType === CONTENT_TYPE_UNDEFINED) {
      return void 0;
    }
    if (contentType === CONTENT_TYPE_NULL) {
      return null;
    }
    if (contentType === CONTENT_TYPE_UINT8_ARRAY) {
      return buf;
    }
    if (contentType === CONTENT_TYPE_STRING) {
      return Decoder.decode(buf);
    }
    if (contentType === CONTENT_TYPE_JSON) {
      return JSON.parse(Decoder.decode(buf));
    }
    if (contentType === CONTENT_TYPE_DB_QUERY) {
      const schemaLen = readUint32(buf, 0);
      const schema = deSerializeSchema(buf.subarray(4, schemaLen + 4));
      const result = buf.subarray(schemaLen + 4);
      return resultToObject(schema, result, result.byteLength);
    }
    throw new Error(`Invalid contentType received - probably using an incorrect version of the @based/client`);
  }, "parseIncomingData");

  // node_modules/@based/client/dist/src/incoming/index.js
  var deflate = /* @__PURE__ */ __name((start, end, isDeflate, buffer) => {
    return isDeflate ? inflateSync(buffer.slice(start, end)) : buffer.subarray(start, end);
  }, "deflate");
  var incoming = /* @__PURE__ */ __name(async (client, data) => {
    if (client.isDestroyed) {
      return;
    }
    try {
      const d2 = data.data;
      const buffer = await parseArrayBuffer(d2);
      const { type, len, isDeflate } = decodeHeader(readUint32(buffer, 0));
      if (type === FunctionClientType.function) {
        const id = readUint24(buffer, 4);
        const start = 7;
        const end = len + 4;
        let payload;
        if (len !== 3) {
          payload = parseIncomingData(buffer[start], deflate(start + 1, end, isDeflate, buffer));
        }
        if (client.functionResponseListeners.has(id)) {
          client.functionResponseListeners.get(id)[0](payload);
          client.functionResponseListeners.delete(id);
        }
      } else if (type === FunctionClientType.get) {
        const id = readUint64(buffer, 4);
        if (client.getState.has(id) && client.cache.has(id)) {
          const get = client.getState.get(id);
          for (const [resolve] of get) {
            resolve(client.cache.get(id).v);
          }
          client.getState.delete(id);
        }
      } else if (type === FunctionClientType.subscriptionDiff) {
        const id = readUint64(buffer, 4);
        const cachedData = client.cache.get(id);
        if (!cachedData) {
          requestFullData(client, id);
          return;
        }
        const checksum = readUint64(buffer, 12);
        const previousChecksum = readUint64(buffer, 20);
        if (cachedData.c !== previousChecksum) {
          requestFullData(client, id);
          return;
        }
        const start = 28;
        const end = len + 4;
        let diff;
        let size = 0;
        if (len !== 24) {
          const inflatedBuffer = isDeflate ? inflateSync(buffer.slice(start + 1, end)) : buffer.subarray(start + 1, end);
          size = inflatedBuffer.byteLength;
          diff = parseIncomingData(buffer[start], inflatedBuffer);
        }
        try {
          if (size > cachedData.s) {
            client.cacheSize -= cachedData.s;
            client.cacheSize += size;
            cachedData.s = size;
          }
          cachedData.v = applyPatch_default(cachedData.v, diff);
          cachedData.c = checksum;
        } catch (err2) {
          requestFullData(client, id);
          return;
        }
        if (client.observeState.has(id)) {
          const observable = client.observeState.get(id);
          if (observable.persistent) {
            cachedData.p = true;
            setStorage(client, CACHE_PREFIX + id, cachedData);
          }
          for (const [, handlers] of observable.subscribers) {
            handlers.onData(cachedData.v, checksum);
          }
        }
        if (client.getState.has(id)) {
          const get = client.getState.get(id);
          for (const [resolve] of get) {
            resolve(cachedData.v);
          }
          client.getState.delete(id);
        }
      } else if (type === FunctionClientType.subscriptionData) {
        const id = readUint64(buffer, 4);
        const checksum = readUint64(buffer, 12);
        const start = 20;
        const end = len + 4;
        let payload;
        let size = 0;
        if (len !== 16) {
          const inflatedBuffer = isDeflate ? inflateSync(buffer.slice(start + 1, end)) : buffer.subarray(start + 1, end);
          size = inflatedBuffer.byteLength;
          payload = parseIncomingData(buffer[start], inflatedBuffer);
        }
        const cached = client.cache.get(id);
        const noChange = cached?.c === checksum;
        if (!noChange) {
          client.cacheSize += size;
          if (cached && cached.s) {
            client.cacheSize -= cached.s;
          }
          if (client.cacheSize > client.maxCacheSize) {
            freeCacheMemory(client);
          }
          const cacheData = {
            v: payload,
            c: checksum,
            s: size
          };
          client.cache.set(id, cacheData);
          if (client.observeState.has(id)) {
            const observable = client.observeState.get(id);
            if (observable.persistent) {
              cacheData.p = true;
              setStorage(client, CACHE_PREFIX + id, cacheData);
            }
            for (const [, handlers] of observable.subscribers) {
              handlers.onData(payload, checksum);
            }
          }
        }
        if (client.getState.has(id)) {
          const get = client.getState.get(id);
          for (const [resolve] of get) {
            resolve(payload);
          }
          client.getState.delete(id);
        }
      } else if (type === FunctionClientType.auth) {
        const start = 4;
        const end = len + 4;
        let payload;
        if (len !== 4) {
          payload = parseIncomingData(buffer[start], deflate(start + 1, end, isDeflate, buffer));
        }
        if (payload === true) {
          client.authRequest.resolve?.(client.authState);
        } else if ("error" in payload) {
          updateAuthState(client, payload);
          client.emit("authstate-change", client.authState);
          client.authRequest.reject?.(new Error(payload.error));
        } else {
          if (!deepEqual_default(client.authState, payload)) {
            updateAuthState(client, payload);
            client.emit("authstate-change", client.authState);
          } else {
            updateAuthState(client, payload);
          }
          client.authRequest?.resolve?.(client.authState);
        }
      } else if (type === FunctionClientType.error) {
        const start = 4;
        const end = len + 4;
        let payload;
        if (len !== 3) {
          payload = parseIncomingData(buffer[start], deflate(start + 1, end, isDeflate, buffer));
        }
        if (payload.streamRequestId) {
          if (client.streamFunctionResponseListeners.has(payload.streamRequestId)) {
            const [, reject] = client.streamFunctionResponseListeners.get(payload.streamRequestId);
            reject(convertDataToBasedError(payload));
            client.streamFunctionResponseListeners.delete(payload.streamRequestId);
          }
        }
        if (payload.requestId) {
          if (client.functionResponseListeners.has(payload.requestId)) {
            const [, reject, stack] = client.functionResponseListeners.get(payload.requestId);
            reject(convertDataToBasedError(payload, stack));
            client.functionResponseListeners.delete(payload.requestId);
          }
        }
        if (payload.channelId) {
          if (client.channelState.has(payload.channelId)) {
            const error = convertDataToBasedError(payload);
            const channel = client.channelState.get(payload.channelId);
            for (const [, handlers] of channel.subscribers) {
              if (handlers.onError) {
                handlers.onError(error);
              } else {
                console.error(getTargetInfo(client, payload.channelId, "channel"), error);
              }
            }
          }
        }
        if (payload.observableId) {
          client.cache.delete(payload.observableId);
          if (client.observeState.has(payload.observableId)) {
            const error = convertDataToBasedError(payload);
            const observable = client.observeState.get(payload.observableId);
            for (const [, handlers] of observable.subscribers) {
              if (handlers.onError) {
                handlers.onError(error);
              } else {
                console.error(
                  // getTargetInfo(client, payload.observableId, 'sub'),
                  error
                );
              }
            }
          }
          if (client.getState.has(payload.observableId)) {
            const error = convertDataToBasedError(payload);
            const get = client.getState.get(payload.observableId);
            for (const [, reject] of get) {
              reject(error);
            }
            client.getState.delete(payload.observableId);
          }
        }
      } else if (type === FunctionClientType.rePublishChannelName) {
        const id = readUint64(buffer, 4);
        const channel = client.channelState.get(id);
        if (id) {
          if (!channel.inTransit) {
            channel.inTransit = true;
            const { buffers, len: len2 } = encodeSubscribeChannelMessage(id, [
              6,
              channel.name,
              channel.payload
            ]);
            const n2 = new Uint8Array(len2);
            let c2 = 0;
            for (const b2 of buffers) {
              n2.set(b2, c2);
              c2 += b2.length;
            }
            client.connection.ws.send(n2);
            if (channel.removeTimer !== -1 && channel.removeTimer < 2) {
              channel.removeTimer += 1;
            }
            setTimeout(() => {
              const channel2 = client.channelState.get(id);
              if (channel2) {
                channel2.inTransit = false;
              }
            }, 5e3);
          }
          client.connection.ws.send(buffer);
        }
      } else if (type === FunctionClientType.subType) {
        const subType = buffer[4];
        if (subType === FunctionClientSubType.channel) {
          const id = readUint64(buffer, 5);
          const start = 13;
          const end = len + 5;
          let payload;
          if (len !== 9 + 1) {
            payload = parseIncomingData(buffer[start], deflate(start + 1, end, isDeflate, buffer));
          }
          if (client.channelState.has(id)) {
            const observable = client.channelState.get(id);
            for (const [, handlers] of observable.subscribers) {
              handlers.onMessage(payload);
            }
          }
        } else if (subType === FunctionClientSubType.streamFullResponse) {
          const id = readUint24(buffer, 5);
          const start = 8;
          const end = len + 4;
          let payload;
          if (len !== 4 + 1) {
            payload = parseIncomingData(buffer[start], deflate(start + 1, end, isDeflate, buffer));
          }
          if (client.streamFunctionResponseListeners.has(id)) {
            client.streamFunctionResponseListeners.get(id)[0](payload);
            client.streamFunctionResponseListeners.delete(id);
          }
        } else if (subType === FunctionClientSubType.streamChunkResponse) {
          const id = readUint24(buffer, 5);
          const seqId = buffer[8];
          const code = buffer[9];
          let maxChunkSize = 0;
          if (len > 7) {
            maxChunkSize = readUint24(buffer, 10);
          }
          if (client.streamFunctionResponseListeners.has(id)) {
            client.streamFunctionResponseListeners.get(id)[2](seqId, code, maxChunkSize);
          }
        } else if (subType === FunctionClientSubType.forceReload) {
          forceReload(client, buffer[5], buffer[6]);
        }
      }
    } catch (err2) {
      console.error(981, err2);
    }
  }, "incoming");

  // node_modules/@based/client/dist/src/websocket/FakeWebsocket.js
  var syncSubs = /* @__PURE__ */ __name((ws2) => {
    if (!ws2._c) {
      setTimeout(() => {
        if (ws2._c) {
          return;
        }
        ws2.client.observeState.forEach((v, k) => {
          const c2 = ws2.client.cache.get(k);
          addObsToQueue(ws2.client, v.name, k, v.payload, c2?.c ?? 0);
        });
        syncSubs(ws2);
      }, ws2.client.restFallBack.pollInterval ?? 1e3);
    }
  }, "syncSubs");
  var _FakeWebsocket = class _FakeWebsocket {
    constructor(url, restPrefix, client) {
      __publicField(this, "url");
      __publicField(this, "authState");
      __publicField(this, "timer");
      __publicField(this, "client");
      __publicField(this, "_c");
      __publicField(this, "_r");
      __publicField(this, "_om");
      __publicField(this, "_oe");
      __publicField(this, "_oc");
      const segments = url.split("/");
      segments[0] = segments[0].replace(/^ws/, "http");
      this.url = segments[0] + "//" + segments[2];
      this.client = client;
      this._r = restPrefix;
      syncSubs(this);
    }
    close() {
      this._c = true;
      if (this._oc) {
        this._oc();
      }
    }
    addEventListener(type, listener) {
      if (type === "open") {
        listener();
      } else if (type === "message") {
        this._om = listener;
      } else if (type === "error") {
        this._oe = listener;
      } else if (type === "close") {
        this._oc = listener;
      }
    }
    removeEventListener() {
    }
    send(binary) {
      if (binary.byteLength === 0) {
        return;
      }
      browser_default2(this.url + "/" + this._r + "/" + encodeAuthState(this.client.authState), {
        method: "post",
        body: binary,
        headers: {
          "content-length": String(binary.byteLength)
        }
      }).then(async (v) => {
        const incomingArrayBuffer = new Uint8Array(await v.arrayBuffer());
        let i2 = 0;
        while (i2 < incomingArrayBuffer.byteLength) {
          const s = readUint32(incomingArrayBuffer, i2);
          const bufTime = incomingArrayBuffer.slice(i2 + 4, s + i2 + 4);
          if (s) {
            incoming(this.client, { data: bufTime });
          } else {
            console.error("error state fix later");
          }
          i2 += s + 4;
        }
      }).catch((err2) => {
        console.error(err2);
      });
    }
  };
  __name(_FakeWebsocket, "FakeWebsocket");
  var FakeWebsocket = _FakeWebsocket;

  // node_modules/@based/client/dist/src/websocket/index.js
  var activityListeners = /* @__PURE__ */ new Map();
  var activeTimer;
  if (typeof document !== "undefined") {
    let putToOffline = false;
    window.addEventListener("offline", () => {
      activityListeners.forEach((fn) => {
        putToOffline = true;
        fn(false, true);
      });
    });
    window.addEventListener("online", () => {
      if (putToOffline) {
        putToOffline = false;
        if (!document.hidden) {
          activityListeners.forEach((fn) => {
            fn(true, false);
          });
        }
      }
    });
    document.addEventListener("visibilitychange", function() {
      clearTimeout(activeTimer);
      if (document.hidden) {
        activeTimer = setTimeout(() => {
          activityListeners.forEach((fn) => {
            fn(false, false);
          });
        }, 3e4);
      } else {
        activityListeners.forEach((fn) => {
          fn(true, false);
        });
      }
    });
  }
  var restPing = /* @__PURE__ */ __name((ms = 1e3, realUrl, connection, fallback) => {
    connection.fallBackTimer = setTimeout(() => {
      if (!connection.disconnected) {
        console.warn(`Cannot connect to ws in ${ms}ms`);
        let d2 = Date.now();
        connection.fallBackInProgress = true;
        const x = realUrl.replace(/^wss?:\/\//, "").split("/");
        const url = `http${realUrl.startsWith("wss") ? "s" : ""}://${x[0]}/based:rpstatus`;
        browser_default2(url).then(async (r) => {
          if (connection.fallBackInProgress) {
            connection.fallBackInProgress = false;
            const t = await r.text();
            if (t && t[0] === "1") {
              const timeEllapsed = Date.now() - d2;
              console.warn(`Took ${timeEllapsed}ms for rest`);
              if (timeEllapsed < ms) {
                console.warn(`was able to connect to rpstatus within ${ms}ms need to fallback to rest`);
                fallback(t);
              } else {
                restPing(timeEllapsed + 100, realUrl, connection, fallback);
              }
            }
          } else {
            console.warn("Connected while trying RP - skip");
          }
        });
      }
    }, ms);
  }, "restPing");
  var connect = /* @__PURE__ */ __name((client, url, connection = {
    destroy: () => {
      clearInterval(connection.keepAliveCloseTimer);
      activityListeners.delete(connection);
    }
  }, time = 0, reconnect = false) => {
    urlLoader_default(url, (realUrl) => {
      setTimeout(() => {
        if (connection.disconnected) {
          return;
        }
        let isActive = true;
        activityListeners.set(connection, (active, isOffline) => {
          if (!connection.disconnected) {
            if (!active && isOffline) {
              isActive = false;
              client.onClose();
              ws2.close();
            } else if (!active && isActive) {
              if (client.functionResponseListeners.size || isStreaming.streaming) {
                console.warn("Send to background - streams or functions in progress try again in 10 seconds...");
                clearTimeout(activeTimer);
                activeTimer = setTimeout(() => {
                  activityListeners.forEach((fn) => {
                    fn(false, false);
                  });
                }, 1e4);
              } else {
                console.warn("Send to background - close connection");
                isActive = false;
                client.onClose();
                ws2.close();
              }
            } else if (!isActive && active) {
              activityListeners.delete(connection);
              connect(client, url, connection, 0, true);
            }
          }
        });
        if (reconnect) {
          client.authState.t = 1;
        }
        const ws2 = connection.ws = connection.useFallback ? new FakeWebsocket(realUrl, connection.useFallback, client) : new browser_default3(realUrl, [encodeAuthState(client.authState)]);
        ws2.binaryType = "blob";
        let isError = false;
        if (!connection.useFallback && client.restFallBack) {
          restPing(300, realUrl, connection, (t) => {
            connection.useFallback = t;
            ws2.close();
          });
        }
        if (client.opts?.lazy && !connection.keeAliveLastUpdated) {
          const keepAlive = client.opts?.lazy.keepAlive;
          connection.keepAliveCloseTimer = setInterval(
            () => {
              connection.keeAliveLastUpdated -= keepAlive / 2;
              if (connection.keeAliveLastUpdated <= 0 && client.observeState.size === 0) {
                client.disconnect();
                clearInterval(connection.keepAliveCloseTimer);
              }
            },
            // @ts-ignore
            keepAlive / 2
          );
          connection.keeAliveLastUpdated = keepAlive;
        }
        ws2.addEventListener("error", (err2) => {
          clearTimeout(connection.fallBackTimer);
          connection.fallBackInProgress = false;
          if (err2.message && err2.message.includes("401")) {
            isError = true;
          }
        });
        ws2.addEventListener("message", (d2) => {
          client.onData(d2);
        });
        ws2.addEventListener("open", () => {
          clearTimeout(connection.fallBackTimer);
          connection.fallBackInProgress = false;
          if (isActive) {
            if (connection.disconnected) {
              return;
            }
            time = 100;
            if (reconnect) {
              client.onReconnect();
            }
            client.onOpen();
          }
        });
        ws2.addEventListener("close", () => {
          clearTimeout(connection.fallBackTimer);
          connection.fallBackInProgress = false;
          if (isActive) {
            if (connection.disconnected) {
              return;
            }
            client.onClose();
            connect(
              client,
              url,
              connection,
              // relatively low backoff but will make it faster if multiple servers are down
              isError ? 5e3 : Math.min(2500, time + ~~(Math.random() * 500) + 100),
              true
            );
          }
        });
      }, time);
    });
    return connection;
  }, "connect");
  var websocket_default = connect;

  // node_modules/@based/client/dist/src/Emitter.js
  var _Emitter = class _Emitter {
    constructor() {
      __publicField(this, "listeners", {});
      Object.defineProperty(this, "listeners", {
        enumerable: false,
        writable: true
      });
    }
    emit(type, val) {
      if (this.listeners[type]) {
        const lis = this.listeners[type];
        for (let i2 = 0, len = lis.length; i2 < lis.length; i2++) {
          const fn = lis[i2];
          fn(val);
          if (len > lis.length) {
            if (lis[i2] !== fn) {
              i2--;
              len = lis.length;
            }
          }
        }
      }
    }
    on(type, fn) {
      if (!this.listeners[type]) {
        this.listeners[type] = [];
      }
      this.listeners[type].push(fn);
    }
    removeAllListeners() {
      this.listeners = {};
    }
    once(type, fn) {
      if (!fn) {
        return new Promise((resolve) => {
          const listener2 = /* @__PURE__ */ __name((v) => {
            resolve(v);
            this.off(type, listener2);
          }, "listener");
          this.on(type, listener2);
        });
      }
      const listener = /* @__PURE__ */ __name(() => {
        this.off(type, listener);
        this.off(type, fn);
      }, "listener");
      this.on(type, fn);
      this.on(type, listener);
    }
    off(type, fn) {
      const listeners = this.listeners[type];
      if (listeners) {
        if (!fn) {
          delete this.listeners[type];
        } else {
          for (let i2 = 0; i2 < listeners.length; i2++) {
            if (listeners[i2] === fn) {
              listeners.splice(i2, 1);
              break;
            }
          }
          if (listeners.length === 0) {
            delete this.listeners[type];
          }
        }
      }
    }
  };
  __name(_Emitter, "Emitter");
  var Emitter = _Emitter;
  var Emitter_default = Emitter;

  // node_modules/@based/client/dist/src/query/index.js
  var _BasedClientQuery = class _BasedClientQuery {
    constructor(client, name, payload, opts) {
      __publicField(this, "id");
      __publicField(this, "query");
      __publicField(this, "name");
      __publicField(this, "client");
      __publicField(this, "persistent");
      this.query = payload;
      this.id = genObserveId(name, payload);
      this.client = client;
      this.name = name;
      this.persistent = opts?.persistent || false;
    }
    get cache() {
      return this.client.cache.get(this.id) || null;
    }
    clearCache() {
      if (this.persistent) {
        removeStorage(this.client, "@based-cache-" + this.id);
      }
      this.client.cache.delete(this.id);
    }
    subscribe(onData, onError) {
      let subscriberId;
      const cachedData = this.client.cache.get(this.id);
      if (!this.client.observeState.has(this.id)) {
        subscriberId = 1;
        const subscribers = /* @__PURE__ */ new Map();
        subscribers.set(subscriberId, {
          onError,
          onData
        });
        this.client.observeState.set(this.id, {
          payload: this.query,
          name: this.name,
          subscribers,
          persistent: this.persistent || false,
          idCnt: 1
        });
        addObsToQueue(this.client, this.name, this.id, this.query, cachedData?.c || 0);
      } else {
        const obs = this.client.observeState.get(this.id);
        if (this.persistent && !obs.persistent) {
          obs.persistent = true;
          if (cachedData) {
            setStorage(this.client, "@based-cache-" + this.id, cachedData);
          }
        }
        subscriberId = ++obs.idCnt;
        obs.subscribers.set(subscriberId, {
          onError,
          onData
        });
      }
      if (cachedData) {
        onData(cachedData.v, cachedData.c);
      }
      return () => {
        const obs = this.client.observeState.get(this.id);
        if (obs) {
          obs.subscribers.delete(subscriberId);
          if (obs.subscribers.size === 0) {
            this.client.observeState.delete(this.id);
            if (this.client.cacheSize > this.client.maxCacheSize) {
              freeCacheMemory(this.client);
            }
            addObsCloseToQueue(this.client, this.id);
          }
        } else {
          console.warn("Subscription allready removed", this.query, this.name);
        }
      };
    }
    async getWhen(condition) {
      return new Promise((resolve) => {
        const close = this.subscribe((data, checksum) => {
          if (condition(data, checksum)) {
            resolve(data);
            close();
          }
        });
      });
    }
    async get() {
      return new Promise((resolve, reject) => {
        if (this.client.getState.has(this.id)) {
          this.client.getState.get(this.id).push([resolve, reject]);
          return;
        }
        const cachedData = this.client.cache.get(this.id);
        if (this.client.observeState.has(this.id)) {
          if (this.client.oQ.has(this.id)) {
            const [type] = this.client.oQ.get(this.id);
            if (type === 1) {
              this.client.getState.set(this.id, [[resolve, reject]]);
              return;
            }
          }
          if (cachedData) {
            resolve(cachedData.v);
            return;
          }
        }
        this.client.getState.set(this.id, [[resolve, reject]]);
        addGetToQueue(this.client, this.name, this.id, this.query, cachedData?.c || 0);
      });
    }
  };
  __name(_BasedClientQuery, "BasedClientQuery");
  var BasedClientQuery = _BasedClientQuery;

  // node_modules/@based/client/dist/src/channel/cleanUp.js
  var cleanUpChannels = /* @__PURE__ */ __name((client) => {
    if (!client.channelCleanTimeout) {
      client.channelCleanTimeout = setTimeout(() => {
        client.channelCleanTimeout = null;
        if (client.connected) {
          let keepRunning = false;
          client.channelState.forEach((value, key) => {
            if (value.removeTimer !== -1) {
              value.removeTimer--;
              if (value.removeTimer === 0) {
                client.channelState.delete(key);
              } else {
                keepRunning = true;
              }
            }
          });
          if (keepRunning) {
            cleanUpChannels(client);
          }
        } else {
          cleanUpChannels(client);
        }
      }, client.channelCleanupCycle);
    }
  }, "cleanUpChannels");

  // node_modules/@based/client/dist/src/channel/index.js
  var _BasedChannel = class _BasedChannel {
    constructor(client, name, payload) {
      __publicField(this, "id");
      __publicField(this, "payload");
      __publicField(this, "name");
      __publicField(this, "client");
      this.payload = payload;
      this.id = genObserveId(name, payload);
      this.client = client;
      this.name = name;
    }
    subscribe(onMessage, onError) {
      let subscriberId;
      if (!this.client.channelState.has(this.id) || this.client.channelState.get(this.id).subscribers.size === 0) {
        subscriberId = 1;
        const subscribers = /* @__PURE__ */ new Map();
        subscribers.set(subscriberId, { onMessage, onError });
        this.client.channelState.set(this.id, {
          payload: this.payload,
          name: this.name,
          subscribers,
          removeTimer: -1,
          idCnt: 1
        });
        addChannelSubscribeToQueue(this.client, this.name, this.id, this.payload);
      } else {
        const channel = this.client.channelState.get(this.id);
        channel.removeTimer = -1;
        subscriberId = ++channel.idCnt;
        channel.subscribers.set(subscriberId, { onMessage, onError });
      }
      return () => {
        const channel = this.client.channelState.get(this.id);
        channel.subscribers.delete(subscriberId);
        if (channel.subscribers.size === 0) {
          channel.removeTimer = 2;
          addChannelCloseToQueue(this.client, this.id);
        }
      };
    }
    publish(message) {
      if (!this.client.channelState.has(this.id)) {
        this.client.channelState.set(this.id, {
          payload: this.payload,
          name: this.name,
          subscribers: /* @__PURE__ */ new Map(),
          removeTimer: 2,
          // 2x 30sec
          idCnt: 0
        });
        cleanUpChannels(this.client);
        addChannelPublishIdentifier(this.client, this.name, this.id, this.payload);
      } else {
        const channel = this.client.channelState.get(this.id);
        if (channel.removeTimer !== -1 && channel.removeTimer < 2) {
          channel.removeTimer = 2;
          cleanUpChannels(this.client);
        }
      }
      addToPublishQueue(this.client, this.id, message);
    }
  };
  __name(_BasedChannel, "BasedChannel");
  var BasedChannel = _BasedChannel;

  // node_modules/@based/opts/node_modules/@based/fetch/browser.js
  var browser_default4 = fetch;

  // node_modules/@saulx/utils/dist/src/wait.js
  var wait_default2 = /* @__PURE__ */ __name((ms = 100) => new Promise((resolve) => {
    setTimeout(() => resolve(), ms);
  }), "default");

  // node_modules/@saulx/utils/dist/src/padding.js
  var padLeft3 = /* @__PURE__ */ __name((str, len, char) => {
    const l2 = str.length;
    for (let i2 = 0; i2 < len - l2; i2++) {
      str = char + str;
    }
    return str;
  }, "padLeft");

  // node_modules/@saulx/utils/dist/src/encoder/decode.js
  var createDecode3 = /* @__PURE__ */ __name((isLong, longest, encodeChars = ["$"], reverseCharMap) => {
    if (encodeChars.length > 1 && isLong) {
      return (input) => {
        let str = "";
        for (let i2 = 0; i2 < input.length; i2++) {
          const c2 = input[i2];
          if (encodeChars.includes(c2)) {
            let fInput = "";
            for (let j = 0; j < longest; j++) {
              fInput += input[i2 + j + 1];
            }
            const f = reverseCharMap[fInput];
            str += f;
            i2 += longest;
          } else {
            str += c2;
          }
        }
        return str;
      };
    }
    if (encodeChars.length > 1) {
      return (input) => {
        let str = "";
        for (let i2 = 0; i2 < input.length; i2++) {
          const c2 = input[i2];
          if (encodeChars.includes(c2)) {
            const f = reverseCharMap[input[i2 + 1]];
            str += f;
            i2++;
          } else {
            str += c2;
          }
        }
        return str;
      };
    }
    const char = encodeChars[0];
    if (isLong) {
      return (input) => {
        let str = "";
        for (let i2 = 0; i2 < input.length; i2++) {
          const c2 = input[i2];
          if (c2 === char) {
            let fInput = "";
            for (let j = 0; j < longest; j++) {
              fInput += input[i2 + j + 1];
            }
            const f = reverseCharMap[fInput];
            str += f;
            i2 += longest;
          } else {
            str += c2;
          }
        }
        return str;
      };
    }
    return (input) => {
      let str = "";
      for (let i2 = 0; i2 < input.length; i2++) {
        const c2 = input[i2];
        if (c2 === char) {
          const f = reverseCharMap[input[i2 + 1]];
          str += f;
          i2++;
        } else {
          str += c2;
        }
      }
      return str;
    };
  }, "createDecode");

  // node_modules/@saulx/utils/dist/src/encoder/encode.js
  var cycleChars2 = /* @__PURE__ */ __name((encodeChars, encodeCharIndex) => {
    if (encodeCharIndex % 2) {
      return encodeChars[encodeChars.length - encodeCharIndex];
    }
    return encodeChars[encodeCharIndex];
  }, "cycleChars");
  var createEncode3 = /* @__PURE__ */ __name((charLen, charMap2, encodeChars) => {
    if (encodeChars.length > 1 && charLen === 1) {
      const encodeCharsLen = encodeChars.length;
      return (input) => {
        let encodeCharIndex = 0;
        let str = "";
        for (let i2 = 0; i2 < input.length; i2++) {
          const c2 = input.charAt(i2);
          if (charMap2[c2]) {
            encodeCharIndex += 1;
            if (encodeCharIndex >= encodeCharsLen) {
              encodeCharIndex = 0;
            }
            str += cycleChars2(encodeChars, encodeCharIndex) + charMap2[c2];
          } else {
            str += c2;
          }
        }
        return str;
      };
    }
    if (encodeChars.length > 1) {
      const encodeCharsLen = encodeChars.length;
      return (input) => {
        let encodeCharIndex = 0;
        let str = "";
        for (let i2 = 0; i2 < input.length; i2++) {
          let added = false;
          for (let j = charLen - 1; j > -1; j--) {
            if (i2 + j > input.length - 1) {
              continue;
            }
            let s = "";
            for (let n2 = 0; n2 < j + 1; n2++) {
              s += input.charAt(i2 + n2);
            }
            if (charMap2[s]) {
              encodeCharIndex += 1;
              if (encodeCharIndex >= encodeCharsLen) {
                encodeCharIndex = 0;
              }
              str += cycleChars2(encodeChars, encodeCharIndex) + charMap2[s];
              i2 += s.length - 1;
              j = -1;
              added = true;
            }
          }
          if (!added) {
            str += input.charAt(i2);
          }
        }
        return str;
      };
    }
    if (charLen === 1) {
      return (input) => {
        let str = "";
        for (let i2 = 0; i2 < input.length; i2++) {
          const c2 = input.charAt(i2);
          if (charMap2[c2]) {
            str += charMap2[c2];
          } else {
            str += c2;
          }
        }
        return str;
      };
    }
    return (input) => {
      let str = "";
      for (let i2 = 0; i2 < input.length; i2++) {
        let added = false;
        for (let j = charLen - 1; j > -1; j--) {
          if (i2 + j > input.length - 1) {
            continue;
          }
          let s = "";
          for (let n2 = 0; n2 < j + 1; n2++) {
            s += input.charAt(i2 + n2);
          }
          if (charMap2[s]) {
            str += charMap2[s];
            i2 += s.length - 1;
            j = -1;
            added = true;
          }
        }
        if (!added) {
          str += input.charAt(i2);
        }
      }
      return str;
    };
  }, "createEncode");

  // node_modules/@saulx/utils/dist/src/encoder/index.js
  var createEncoder2 = /* @__PURE__ */ __name((chars, encodeChars = ["$"]) => {
    let charLen = 1;
    const isLong = chars.length > 36;
    const realChars = [...chars, ...encodeChars];
    const replacement = realChars.map((v, i2) => {
      if (v.length > charLen) {
        charLen = v.length;
      }
      if (i2 > 25) {
        return String(i2 - 26);
      }
      return String.fromCharCode(97 + i2);
    });
    const charMap2 = {};
    const reverseCharMap = {};
    for (let i2 = 0; i2 < realChars.length; i2++) {
      charMap2[realChars[i2]] = encodeChars.length === 1 ? encodeChars[0] + replacement[i2] : replacement[i2];
      reverseCharMap[replacement[i2]] = realChars[i2];
    }
    let longest = 1;
    if (isLong) {
      for (const key in reverseCharMap) {
        if (key.length > longest) {
          longest = key.length;
        }
      }
      for (const key in reverseCharMap) {
        if (key.length < longest) {
          const nKey = padLeft3(key, longest, "0");
          const c2 = reverseCharMap[key];
          if (encodeChars.length > 1) {
            charMap2[c2] = nKey;
          } else {
            charMap2[c2] = encodeChars[0] + nKey;
          }
          delete reverseCharMap[key];
          reverseCharMap[nKey] = c2;
        }
      }
    }
    return {
      charMap: charMap2,
      reverseCharMap,
      encode: createEncode3(charLen, charMap2, encodeChars),
      decode: createDecode3(isLong, longest, encodeChars, reverseCharMap)
    };
  }, "createEncoder");

  // node_modules/@based/opts/dist/index.js
  var a = /* @__PURE__ */ __name((e, t, s, r, a2 = "allServices", o2 = 0) => ((e2) => {
    let t2 = 5381, s2 = e2.length;
    for (; s2; )
      t2 = 33 * t2 ^ e2.charCodeAt(--s2);
    let r2 = t2 >>> 0;
    for (; r2 > 65535; )
      r2 /= 10;
    return Math.round(r2);
  })(`${a2}-${e}-${t}-${s}-${r}-${o2}`), "a");
  var o = /* @__PURE__ */ __name((e) => e || "@based/env-hub", "o");
  var n = /^ws/;
  var l = { "@based/env-hub": 0, "@based/env-admin-hub": 1, "@based/admin-hub": 2, "@based/machine-hub": 3 };
  var h = /* @__PURE__ */ __name((e) => {
    const t = l[o(e.name)] + "" + Math.floor(1e4 * Math.random());
    return e.key ? t + "/" + (e.optionalKey ? e.key + "$" : e.key) : t;
  }, "h");
  var c = /* @__PURE__ */ __name(async (t, r, a2) => {
    try {
      const o2 = await browser_default4(`${t}/status/${h(r)}`, { headers: r.headers });
      if (o2.ok) {
        const e = o2.headers.get("x-request-id");
        if (!e)
          return 1;
        const { decode: r2 } = createEncoder2(u, e.slice(0, 6).split("")), n2 = r2(e.slice(6)).split(","), l2 = [];
        for (let e2 = 0; e2 < Math.floor(n2.length / 2); e2++)
          l2.push([n2[e2], encodeURIComponent(n2[n2.length - 1 - e2])]);
        const [h2, c2] = l2[~~(Math.random() * l2.length)], d2 = /^https/.test(t) ? "s" : "";
        return a2 ? `http${d2}://${h2}` : `ws${d2}://${h2}/${c2}`;
      }
      return false;
    } catch (e) {
      return false;
    }
  }, "c");
  var d = /* @__PURE__ */ __name(async (e, s = false, l2 = 0) => {
    if (e.url) {
      let t;
      return t = "function" == typeof e.url ? await e.url() : e.url, s && t && n.test(t) ? t.replace(n, "http") : t;
    }
    const h2 = e.discoveryUrls || (({ cluster: e2 = "production", org: t, project: s2, env: n2, name: l3, host: h3 }) => "local" === e2 ? [`http://${h3 || "localhost"}:${a(t, s2, n2, o(l3).includes("env-") ? "@based/env-hub-discovery" : "@based/hub-discovery", "allServices")}`] : [`https://${hashObjectIgnoreKeyOrder_default2({ org: t, project: s2, env: n2, cluster: e2 }).toString(36)}-status.${h3 || "based.dev"}`])(e);
    for (let r = 0; r < h2.length; r++) {
      const a2 = h2[r], o2 = await Promise.race([c(a2, e, s), wait_default2(3e3)]);
      if (1 === o2 || !o2 && r === h2.length - 1)
        return await wait_default2(Math.min(l2 * l2 * 50 + 500, 5e3)), d(e, s, ++l2);
      if (o2)
        return o2;
    }
  }, "d");
  var u = [",", ".based.dev", "localhost:", "localhost", "based.io", "based.dev", "@based", "/env-hub", "admin", "hub", "900", "90", "443", "80", ":", "%", "/", "=", "<", "?", "."];
  var i = d;
  var b = /* @__PURE__ */ __name(async (e, t) => i(e, t), "b");

  // node_modules/@based/client/dist/src/index.js
  var isBrowser = typeof window !== "undefined";
  var lastReloadSeqId = -1;
  if (isBrowser) {
    if (typeof global === "undefined") {
      window.global = window;
    }
    const loc = window.location.href;
    if (loc.includes(cacheId)) {
      const [url, lastSeqId] = loc.split(cacheId);
      if (lastSeqId) {
        lastReloadSeqId = Number(lastSeqId);
        window.history.replaceState(null, document.title, url);
      }
    }
  }
  var env;
  var getEnv = /* @__PURE__ */ __name(async () => {
    if (env === void 0) {
      env = global.BASED?.opts?.env;
      if (!env && typeof process === "object") {
        env = process.env.ENV;
      }
      env ||= "";
    }
    return env;
  }, "getEnv");
  var _BasedClient = class _BasedClient extends Emitter_default {
    constructor(opts, settings) {
      super();
      // --------- Restfallback http 1.1 / Proxies
      __publicField(this, "restFallBack");
      // --------- Force reconnect
      __publicField(this, "lastForceId", lastReloadSeqId);
      // --------- Persistent Storage
      __publicField(this, "storageSize", 0);
      __publicField(this, "maxStorageSize", 5e6 - 500);
      // ~5mb
      __publicField(this, "storageEnvKey", 0);
      __publicField(this, "storagePath");
      __publicField(this, "storageBeingWritten");
      // --------- Connection State
      __publicField(this, "opts");
      __publicField(this, "connected", false);
      __publicField(this, "connection");
      __publicField(this, "url");
      // --------- Stream
      __publicField(this, "outgoingStreams", /* @__PURE__ */ new Map());
      __publicField(this, "isDrainingStreams", false);
      // --------- Queue
      __publicField(this, "maxPublishQueue", 1e3);
      __publicField(this, "pQ", []);
      __publicField(this, "fQ", []);
      __publicField(this, "sQ", []);
      __publicField(this, "oQ", /* @__PURE__ */ new Map());
      __publicField(this, "cQ", /* @__PURE__ */ new Map());
      __publicField(this, "gQ", /* @__PURE__ */ new Map());
      __publicField(this, "drainInProgress", false);
      __publicField(this, "drainTimeout");
      __publicField(this, "idlePing");
      // --------- Cache State
      __publicField(this, "cacheSize", 0);
      __publicField(this, "localStorage", false);
      __publicField(this, "maxCacheSize", 5e7);
      // 50MB
      __publicField(this, "cache", /* @__PURE__ */ new Map());
      // --------- Function State
      __publicField(this, "functionResponseListeners", /* @__PURE__ */ new Map());
      __publicField(this, "requestId", 0);
      // max 3 bytes (0 to 16777215)
      // --------- Channel State
      __publicField(this, "channelState", /* @__PURE__ */ new Map());
      __publicField(this, "channelCleanTimeout");
      __publicField(this, "channelCleanupCycle", 3e4);
      // --------- Observe State
      __publicField(this, "observeState", /* @__PURE__ */ new Map());
      // --------- Get State
      __publicField(this, "getState", /* @__PURE__ */ new Map());
      // -------- Auth state
      __publicField(this, "authState", {});
      __publicField(this, "authRequest", {
        authState: null,
        promise: null,
        resolve: null,
        reject: null,
        inProgress: false
      });
      // --------- Function State
      __publicField(this, "streamFunctionResponseListeners", /* @__PURE__ */ new Map());
      __publicField(this, "streamRequestId", 0);
      // ---------- Destroy
      __publicField(this, "isDestroyed");
      if (settings?.persistentStorage) {
        this.storagePath = settings.persistentStorage;
      }
      if (settings?.maxCacheSize) {
        this.maxCacheSize = settings.maxCacheSize;
      }
      if (settings?.restFallBack) {
        this.restFallBack = settings.restFallBack;
      }
      if (opts) {
        this.connect(opts);
      }
    }
    // max 3 bytes (0 to 16777215)
    // cache
    clearUnusedCache() {
      freeCacheMemory(this);
    }
    // --------- Internal Events
    onClose() {
      this.connected = false;
      if (this.functionResponseListeners.size > this.fQ.length) {
        this.functionResponseListeners.forEach((p, k) => {
          if (!this.fQ.find(([id]) => {
            if (id === k) {
              return true;
            }
            return false;
          })) {
            p[1](new Error(`Server disconnected before function result was processed`));
            this.functionResponseListeners.delete(k);
          }
        });
      }
      this.emit("disconnect", true);
    }
    onReconnect() {
      this.connected = true;
      this.emit("reconnect", true);
    }
    onOpen() {
      this.connected = true;
      this.emit("connect", true);
      for (const [id, obs] of this.observeState) {
        if (!this.oQ.has(id)) {
          const cachedData = this.cache.get(id);
          addObsToQueue(this, obs.name, id, obs.payload, cachedData?.c || 0);
        }
      }
      for (const [id, channel] of this.channelState) {
        if (!this.cQ.has(id)) {
          if (channel.subscribers.size) {
            addChannelSubscribeToQueue(this, channel.name, id, channel.payload);
          } else {
            addChannelPublishIdentifier(this, channel.name, id, channel.payload);
          }
        }
      }
      drainQueue(this);
    }
    onData(data) {
      incoming(this, data);
    }
    // --------- Connect
    /**
      Connect to a server or based cluster
      
      ```javascript
      // Connects to a specific based server
      client.connect({
        url: 'ws://localhost:9910'
      })
    
      // Connects to an environment in the based cloud
      client.connect({
        org: 'saulx',
        project: 'demo',
        env: 'production'
      })
      ```
       */
    async connect(opts) {
      if (opts && Object.keys(opts).length > 0) {
        if (opts.env?.toLowerCase() === "#branch") {
          opts = {
            ...opts,
            env: await getEnv()
          };
        }
        if (opts.lazy === true) {
          opts.lazy = {
            keepAlive: 3e3
          };
        }
        if (this.opts) {
          if (deepEqual_default(this.opts, opts)) {
            return;
          }
          this.disconnect();
        }
        this.opts = opts;
        this.url = () => b(opts);
        this.storageEnvKey = hashObjectIgnoreKeyOrder_default(opts);
        initStorage(this);
      }
      if (!this.opts) {
        console.error("Configure opts to connect");
        return;
      }
      if (this.url && !this.connection && !this.opts.lazy) {
        this.connection = websocket_default(this, this.url);
      }
    }
    /**
    Disconnect the client
    
    ```javascript
    client.disconnect()
    ```
     */
    disconnect() {
      if (this.connection) {
        this.connection.disconnected = true;
        this.connection.destroy();
        if (this.connection.ws) {
          this.connection.ws.close();
        }
        if (this.connected) {
          this.onClose();
        }
        delete this.connection;
      }
      clearTimeout(this.drainTimeout);
      clearTimeout(this.idlePing);
      this.connected = false;
    }
    /**
      Destroy the client, will remove all internals and cannot be resued,
      will update localStorage with the all `persistent` queries in memory
      
      ```javascript
      await client.destroy()
    
      // Do not update localStorage with current state
      await client.destroy(true)
      ```
       */
    async destroy(noStorage) {
      if (!noStorage) {
        await updateStorage(this, true);
      }
      clearTimeout(this.storageBeingWritten);
      clearTimeout(this.channelCleanTimeout);
      this.disconnect();
      for (const i2 in this) {
        delete this[i2];
      }
      this.isDestroyed = true;
    }
    // ---------- Channel
    /**
      Subscribe or publish to a channel, channels are stateless
      
      ```javascript
      client.channel('events', { type: 'pageview' })
        .subscribe(event => console.info(event))
    
      client.channel('events', { type: 'pageview' })
        .publish({ path: '/home' })
      ```
       */
    channel(name, payload) {
      return new BasedChannel(this, name, payload);
    }
    // ---------- Query
    /**
      Query, subscribe or get from a query function, query functions keep their current state memcached
      
      ```javascript
      // Receive updates
      client.query('db', {
        $id: 'userid',
        posts: true
      }).subscribe(data => console.info(data))
    
      // Receive updates, and store in localStorage
      client.query('db', {
        $id: 'userid',
        posts: true
      }, { persistent: true })
        .subscribe(data => console.info(data))
    
      // Get the current state of a user
      await client.query('db', {
        $id: 'userid',
        email: true
      }).get()
      ```
      */
    query(name, payload, opts) {
      return new BasedClientQuery(this, name, payload, opts);
    }
    // -------- Function
    /**
    Callable function, mostly used for modifications.
    */
    call(name, payload, opts) {
      const retryStrategy = opts?.retryStrategy;
      if (retryStrategy) {
        return new Promise((resolve, reject) => {
          let time = 0;
          let retries = 0;
          const retryReject = /* @__PURE__ */ __name(async (err2) => {
            try {
              const result = await retryStrategy(err2, time, retries);
              const isObj = typeof result === "object";
              const newPayload = (isObj ? result.payload : payload) ?? payload;
              const newTime = isObj ? result.time : result;
              retries++;
              if (typeof newTime === "number" && !isNaN(newTime)) {
                time = newTime;
                if (newTime === 0) {
                  addToFunctionQueue(this, newPayload, name, resolve, retryReject);
                } else {
                  setTimeout(() => {
                    addToFunctionQueue(this, newPayload, name, resolve, retryReject);
                  }, newTime);
                }
              } else {
                reject(err2);
              }
            } catch (e) {
              reject(e);
            }
          }, "retryReject");
          return addToFunctionQueue(this, payload, name, resolve, retryReject);
        });
      } else {
        return new Promise((resolve, reject) => {
          return addToFunctionQueue(this, payload, name, resolve, reject);
        });
      }
    }
    // -------- Stream
    /**
    Stream large payload to a `stream-function`
    
    ```javascript
    await client.stream('db:file', file)
    ```
    */
    stream(name, stream, progressListener) {
      return browser_default(this, name, stream, progressListener);
    }
    // -------- Auth
    /**
    Set auth state on client and server, `persistent`
    will keep the authState in localStorage
    
    ```javascript
    await client.setAuthState({ token: 'token', persistent: true })
    ```
    */
    setAuthState(authState) {
      if (typeof authState === "object") {
        return sendAuth(this, authState);
      } else {
        throw new Error("Invalid auth() arguments");
      }
    }
    /**
    Removes the current authState on server and client
    
    ```javascript
    await client.clearAuthState()
    ```
    */
    clearAuthState() {
      return sendAuth(this, {});
    }
    // -------- Storage layer
    /**
    Clear localStorage (removes storage file if configured for node.js)
    
    ```javascript
    await client.clearStorage()
    ```
    */
    clearStorage() {
      return clearStorage(this);
    }
    /**
    Save current state of all cached query functions that have `persistent` set to true
    
    ```javascript
    await client.saveStorage()
    ```
    */
    saveStorage() {
      return updateStorage(this);
    }
  };
  __name(_BasedClient, "BasedClient");
  var BasedClient = _BasedClient;
  function based(opts = {}, settings) {
    if (globalThis.basedOpts && !opts.env && !opts.org && !opts.project) {
      opts = {
        ...globalThis.basedOpts,
        ...opts
      };
    }
    return new BasedClient(opts, settings);
  }
  __name(based, "based");
    
    // added for bypassing cache
    const originalGet = BasedClientQuery.prototype.get;
    BasedClientQuery.prototype.get = function() {
        this.client.cache.delete(this.id);
        return originalGet.call(this);
    };
    
  return __toCommonJS(src_exports);
})();
