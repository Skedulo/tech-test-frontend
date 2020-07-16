module.exports = {
    reporters: [
      "default",
    	[ "jest-junit", { suiteName: "jest tests" } ]
  ]
}