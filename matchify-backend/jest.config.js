module.exports = {
    reporters: [
      "default",
      [
        "jest-html-reporters",
        {
          publicPath: "./jest-reports",
          filename: "report.html",
          expand: true,
        },
      ],
    ],
  };
  