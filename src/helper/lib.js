export const getClassNameByValue = (variable, value) => {
  const thresholds = {
    bmi: [
      {
        max: 18.5, //
        className: "yellow",
        status: "Mild",
        maxInclusive: false,
      },
      {
        min: 18.5, //
        max: 24.9,
        className: "white",
        status: "Normal",
        minInclusive: true,
        maxInclusive: true,
      },
      {
        min: 24.9, //
        max: 29.9,
        className: "yellow",
        status: "Moderate",
        minInclusive: false,
        maxInclusive: true,
      },
      {
        min: 29.9, //
        className: "red",
        status: "Severe",
        minInclusive: false,
      },
    ],
    temp: [
      {
        max: 98.4, //
        className: "white",
        status: "Normal",
        maxInclusive: false,
      },
      {
        min: 98.4, //
        max: 102,
        className: "yellow",
        status: "Mild",
        minInclusive: true,
        maxInclusive: true,
      },
      {
        min: 102, //
        className: "red",
        status: "Moderate",
        minInclusive: false,
      },
    ],
    fbs: [
      {
        max: 6, //
        className: "white",
        status: "Normal",
        maxInclusive: false,
      },
      {
        min: 6, //
        max: 7,
        className: "yellow",
        status: "Mild",
        minInclusive: true,
        maxInclusive: true,
      },
      {
        min: 7, //
        className: "red",
        status: "Moderate",
        minInclusive: false,
      },
    ],
    rbs: [
      {
        max: 7, //
        className: "white",
        status: "Normal",
        maxInclusive: false,
      },
      {
        min: 7, //
        max: 11,
        className: "yellow",
        status: "Mild",
        minInclusive: true,
        maxInclusive: true,
      },
      {
        min: 11, //
        className: "red",
        status: "Moderate",
        minInclusive: false,
      },
    ],
    hr: [
      {
        max: 60, //
        className: "red",
        status: "Moderate",
        maxInclusive: false,
      },
      {
        min: 60, //
        max: 100,
        className: "white",
        status: "Normal",
        minInclusive: true,
        maxInclusive: true,
      },
      {
        min: 100, //
        className: "red",
        status: "Moderate",
        minInclusive: false,
      },
    ],
    spo2: [
      {
        max: 93, //
        className: "red",
        status: "Moderate",
        maxInclusive: false,
      },
      {
        min: 93, //
        max: 94,
        className: "yellow",
        status: "Mild",
        minInclusive: true,
        maxInclusive: true,
      },
      {
        min: 94, //
        className: "white",
        status: "Normal",
        minInclusive: false,
      },
    ],
    resp_rate: [
      {
        max: 12, //
        className: "red",
        status: "Moderate",
        maxInclusive: false,
      },
      {
        min: 12, //
        max: 25,
        className: "white",
        status: "Normal",
        minInclusive: true,
        maxInclusive: true,
      },
      {
        min: 25, //
        className: "red",
        status: "Moderate",
        minInclusive: false,
      },
    ],
    cardiovascular_risk: [
      {
        max: 10, //
        className: "white",
        status: "Normal",
        maxInclusive: false,
      },
      {
        min: 10, //
        max: 20,
        className: "yellow",
        status: "Mild",
        minInclusive: true,
        maxInclusive: true,
      },
      {
        min: 20, //
        max: 30,
        className: "red",
        status: "Moderate",
        minInclusive: false,
        maxInclusive: true,
      },
      {
        min: 30, //
        className: "red",
        status: "Severe",
        minInclusive: false,
      },
    ],
    hba1c: [
      {
        max: 6.5, //
        className: "white",
        status: "Normal",
        maxInclusive: false,
      },
      {
        min: 6.5, //
        className: "red",
        status: "Moderate",
        minInclusive: true,
      },
    ],
    diabetes: [
      {
        max: 5.3, //
        className: "white",
        status: "Normal",
        maxInclusive: false,
      },
      {
        min: 5.3, //
        className: "red",
        status: "Moderate",
        minInclusive: true,
      },
    ],
  };

  // unknown variable
  if (!thresholds[variable]) {
    return {
      className: "white",
      status: "Normal",
    };
  }

  const variableValue = parseFloat(value);

  for (const range of thresholds[variable]) {
    if (
      (!range.min ||
        (range.minInclusive
          ? variableValue >= range.min
          : variableValue > range.min)) &&
      (!range.max ||
        (range.maxInclusive
          ? variableValue <= range.max
          : variableValue < range.max))
    ) {
      return {
        className: range.className,
        status: range.status,
      };
    }
  }

  // cases where the value doesn't match any range
  return {
    className: "white",
    status: "Normal",
  };
};

export const getClassNameForHB = (GenderId, value) => {
  // console.log(GenderId);
  const genderFemale = "A86A8E20-25EF-46DF-B5BB-40DBD628D29D";
  const val = parseFloat(value);

  if (val < 8) {
    return {
      className: "red",
      status: "Severe",
    };
  } else if (val >= 8 && val <= 10) {
    return {
      className: "red",
      status: "Moderate",
    };
  } else {
    if (GenderId === genderFemale) {
      if (val > 10 && val < 12) {
        return {
          className: "yellow",
          status: "Mild",
        };
      } else if (val >= 12 && val <= 16) {
        return {
          className: "white",
          status: "Normal",
        };
      }
    } else {
      if (val > 10 && val < 14) {
        return {
          className: "yellow",
          status: "Mild",
        };
      } else if (val >= 14 && val <= 18) {
        return {
          className: "white",
          status: "Normal",
        };
      }
    }
  }

  // Cases where the value doesn't match any range
  return {
    className: "white",
    status: "Normal",
  };
};

// export const getClassNameForBP = (systolic, diastolic) => {
//   const systolicBP = parseFloat(systolic);
//   const diastolicBP = parseFloat(diastolic);

//   const normal = { className: "white", status: "Normal" };
//   const mild = { className: "yellow", status: "Mild" };
//   const moderate = { className: "red", status: "Moderate" };
//   const severe = { className: "red", status: "Severe" };

//   if (systolicBP <= 130 && diastolicBP <= 80) {
//     return normal;
//   } else if (
//     (systolicBP > 130 && systolicBP < 140) ||
//     (diastolicBP > 80 && diastolicBP < 90)
//   ) {
//     return mild;
//   } else if (
//     (systolicBP > 140 && systolicBP <= 180) ||
//     (diastolicBP > 90 && diastolicBP <= 110)
//   ) {
//     return moderate;
//   } else if (systolicBP > 180 || diastolicBP > 110) {
//     return severe;
//   } else {
//     return normal;
//   }
// };

export const getClassNameForBP = (systolic, diastolic) => {
  const systolicBP = parseFloat(systolic);
  const diastolicBP = parseFloat(diastolic);

  if (systolicBP <= 130 && diastolicBP <= 80) {
    return { className: "white", status: "Normal" };
  } else if (systolicBP <= 140 || diastolicBP <= 90) {
    return { className: "yellow", status: "Mild" };
  } else if (systolicBP <= 180 || diastolicBP <= 110) {
    return { className: "red", status: "Moderate" };
  } else {
    return { className: "red", status: "Severe" };
  }
};
