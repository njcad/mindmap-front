import { createSystem, defaultConfig } from "@chakra-ui/react"

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        heading: { value: `'Inter', sans-serif` },
        body: { value: `'Inter', sans-serif` },
        
      },
        letterSpacings: {
            tight: { value: "-0.04em" },         
      },
      colors: {
        primary: { value: "#6395EE"},
        secondary: {value: "#1657CB"}
      }
    }
  },
})