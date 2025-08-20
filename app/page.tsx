"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Play, Pause, Calculator, Thermometer, Wind, Zap } from "lucide-react"

export default function YorkPresentation() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(false)
  const [showTableModal, setShowTableModal] = useState(false)
  const [selectedTable, setSelectedTable] = useState(null)
  const [showTable1, setShowTable1] = useState(false)
  const [showTable3, setShowTable3] = useState(false)
  const [showEnthalpyChart, setShowEnthalpyChart] = useState(false)
  const [showHeatingTable1, setShowHeatingTable1] = useState(false)
  const [showNomenclatureTable, setShowNomenclatureTable] = useState(false)
  const [showElectricTable, setShowElectricTable] = useState(false)
  const [showElectricNomenclatureTable, setShowElectricNomenclatureTable] = useState(false)
  const [showSupplyFanTable, setShowSupplyFanTable] = useState(false)
  const [showSupplyFanNomenclature, setShowSupplyFanNomenclature] = useState(false)
  const [showExhaustTable3, setShowExhaustTable3] = useState(false)
  const [showRTUVisualization, setShowRTUVisualization] = useState(false)
  const [showExhaustNomenclature, setShowExhaustNomenclature] = useState(false)

  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const slides = [
    {
      id: 1,
      title: "Application of Psychrometric in York Rooftop Unit",
      subtitle: "",
      type: "title",
      content: {
        images: [
          {
            src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-VTmXiq7YzFuwF4iDuQIeePBWEHcrrI.png",
            alt: "York RTU Components Diagram - Cutaway view showing internal components A through N",
            caption: "York RTU Internal Components - Cutaway View",
          },
          {
            src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-XAirZunNO4pgr7qrOItTv3lQtY6yO4.png",
            alt: "Typical Heat Wheel RTU - Detailed cutaway showing air flow paths and components",
            caption: "Typical Heat Wheel RTU - Air Flow Diagram",
          },
        ],
        components: [
          "A - Economizer",
          "B - Evaporator coil",
          "C - Direct drive plenum (DDP) supply fan",
          "D - Modulating or staged gas heat",
          "E - Condenser fans",
          "F - Scroll compressors",
          "G - Condenser coil cleaning hatch",
          "H - Final filter",
          "I - Unit controller and power",
          "J - Filter section",
          "K - Outside air (right side)",
          "L - Collapsible rain hoods",
          "M - Exhaust air (front)",
          "N - Exhaust and return fan",
        ],
      },
    },
    {
      id: 2,
      title: "Definitions",
      subtitle: "Understanding heat transfer fundamentals",
      type: "detailed-content",
      content: {
        mainConcept:
          "The correct selection of a packaged rooftop unit (RTU) begins with a deep understanding of the building's cooling and heating requirements, collectively known as the 'load.'",
        definitions: [
          {
            title: "Total Cooling Load",
            description: "Total amount of heat that must be removed from a space to maintain design temperature",
            formula: "Total Load = Sensible Load + Latent Load",
            units: "British Thermal Units per hour (Btuh) or kilowatts (kW)",
            details: "This is not a single number but a combination of different heat types",
          },
          {
            title: "Sensible Load",
            description: "Portion of heat energy that changes air's dry-bulb temperature when added/removed",
            formula: "Qs = 1.08 × CFM × ΔT",
            units: "Btuh",
            details:
              "Sources: solar radiation through walls/roofs, lighting systems, office equipment, machinery, occupants' body heat",
          },
          {
            title: "Latent Load",
            description: "Heat energy associated with moisture content in air - requires condensing water vapor",
            formula: "Ql = 0.68 × CFM × Δω",
            units: "Btuh",
            details:
              "Sources: occupants' respiration/perspiration, cooking, humid outside air infiltration, industrial processes",
          },
          {
            title: "Sensible Heat Ratio (SHR)",
            description: "Critical engineering parameter indicating nature of cooling load",
            formula: "SHR = Sensible Load / Total Load",
            units: "Dimensionless (0 to 1.0)",
            details: "High SHR (≈1.0): office with windows/computers. Low SHR: crowded restaurant/gymnasium",
          },
        ],
      },
    },
    {
      id: 3,
      title: "Key Air-Side Parameters & Design Conditions",
      subtitle: "Critical design parameters for equipment selection",
      type: "technical-specs",
      content: {
        intro:
          "To translate building loads into equipment selection, engineers must define critical design conditions that define operating parameters.",
        parameters: [
          {
            parameter: "Airflow (CFM)",
            definition: "Volume of air the RTU's fan system must move",
            measurement: "Cubic Feet per Minute (CFM)",
            importance: "Delivers adequate cooling/heating to space",
            calculation: "Based on load requirements and temperature differential",
          },
          {
            parameter: "Entering Dry-Bulb (EDB)",
            definition: "Temperature of mixed air entering RTU's evaporator coil",
            measurement: "°F measured by standard thermometer",
            importance: "Determines sensible cooling capacity",
            calculation: "Mixed air = Return air + Fresh outside air",
          },
          {
            parameter: "Entering Wet-Bulb (EWB)",
            definition: "Measure of air's total heat content (enthalpy) combining temperature and humidity",
            measurement: "°F measured with moistened wick thermometer",
            importance: "Determines total cooling capacity and dehumidification",
            calculation: "Difference between EDB and EWB indicates relative humidity",
          },
          {
            parameter: "Outside Air Design Temperature",
            definition: "Ambient condition at which unit must perform at peak load",
            measurement: "°F from ASHRAE standards",
            importance: "Critical for condenser sizing and performance verification",
            calculation: "Location-specific data from ASHRAE standards",
          },
        ],
      },
    },
    {
      id: 4,
      title: "Fan System Heat Addition - Critical Calculations",
      subtitle: "Motor heat impact on cooling capacity",
      type: "calculation-detailed",
      content: {
        concept:
          "The electrical energy consumed by the fan motor is converted into heat and added to the conditioned airstream. The RTU's cooling coil must handle both the building load AND the parasitic heat load it generates itself.",
        keyDistinction: {
          motorHP: {
            title: "Motor Horsepower (HP)",
            definition: "Rated output on motor nameplate",
            purpose: "Indicates safe operating capability without overloading",
          },
          brakeHP: {
            title: "Brake Horsepower (BHP)",
            definition: "Actual power required by fan at specific operating point",
            purpose: "Real power needed for specific CFM and static pressure combination",
            example: "15 HP motor may only need 12 BHP to meet system demand",
          },
        },
        formula: {
          main: "Supply Fan Sensible Heat Addition (Btuh) = BHP × 2,750",
          constant: "2,750",
          derivation: "Derived from 1 BHP ≈ 2545 Btuh, adjusted for motor efficiency",
          assumption: "Nearly all electrical energy consumed converts to heat in airstream",
        },
        consequence:
          "Failure to account for this heat load leads to undersized equipment selection, compromising performance and dehumidification capabilities",
      },
    },
    {
      id: 5,
      title: "Altitude Impact on HVAC Performance",
      subtitle: "High elevation corrections and performance factors",
      type: "altitude-analysis",
      content: {
        concept:
          "Air-cooled HVAC systems are significantly affected by altitude above sea level due to lower air density at higher elevations.",
        effects: [
          {
            category: "Fan Performance",
            impact: "Fans move volume (CFM) but cooling depends on mass of air moved",
            result: "Same CFM at high altitude = less mass = reduced heat transfer capability",
            formula: "Mass flow = ρ × CFM (where ρ decreases with altitude)",
          },
          {
            category: "Condenser Performance",
            impact: "Thinner air less effective at carrying heat away from condenser",
            result: "Higher condensing pressures and reduced system efficiency",
            formula: "Heat rejection capacity ∝ air density",
          },
        ],
        equations: {
          standard: "Qs = 1.08 × CFM × ΔT",
          note: "The 1.08 constant includes standard sea-level air density (0.075 lb/ft³)",
          altitude: "At higher altitudes, this constant decreases proportionally",
          correction: "Manufacturers provide Altitude Correction Factors for published data",
        },
        importance: "Neglecting altitude correction can result in unit failure to meet design capacity",
      },
    },
    {
      id: 6,
      title: "York RTU Application - Design Requirements (90-150 Ton)",
      subtitle: "Project specifications and given parameters",
      type: "project-specs",
      content: {
        title: "Given Design Data:",
        specifications: [
          {
            category: "Cooling Capacity",
            requirement: "Total Cooling Capacity",
            value: "970,000 Btuh",
            note: "Primary cooling load requirement",
          },
          {
            category: "Cooling Capacity",
            requirement: "Sensible Cooling",
            value: "600,000 Btuh",
            note: "Temperature-related cooling load",
          },
          {
            category: "Heating Capacity",
            requirement: "Required Heating",
            value: "800,000 Btuh",
            note: "Space heating load requirement",
          },
          {
            category: "Airflow",
            requirement: "Supply Fan",
            value: "25,000 CFM",
            note: "Volume of conditioned air delivery",
          },
          {
            category: "Pressure",
            requirement: "External Static Pressure (ESP)",
            value: "2.0 in. w.g.",
            note: "Ductwork system resistance",
          },
          {
            category: "Air Conditions",
            requirement: "Entering Air on Evaporator",
            value: "80.0°F DB / 67.0°F WB",
            note: "Mixed return and outside air conditions",
          },
          {
            category: "Ambient",
            requirement: "Outside Design Temperature",
            value: "95.0°F",
            note: "Peak ambient condition for sizing",
          },
          {
            category: "Electrical",
            requirement: "Supply Voltage",
            value: "460V / 3-Phase / 60Hz",
            note: "Power supply specifications",
          },
          {
            category: "Features",
            requirement: "Additional Requirements",
            value: "Economizer, 2 in. throwaway filters, VAV control",
            note: "Special features and controls",
          },
        ],
        shr: {
          calculation: "SHR = 600,000 / 970,000 = 0.62",
          interpretation: "Moderate sensible load with significant latent component",
        },
        unitSelection: {
          method: "Using Table 3 at design conditions of 80/67 and 25,000 CFM",
          capacity: "1,050 MBtuh total and 703 MBtuh sensible",
          selection: "90 ton nominal unit size standard efficiency",
        },
      },
    },
    {
      id: 7,
      title: "Detailed Cooling Capacity Calculations",
      subtitle: "Step-by-step sizing methodology with actual data",
      type: "step-calculations",
      content: {
        steps: [
          {
            step: "Step 1: Fan Selection from Table 1",
            input: (
              <span>
                25,000 CFM at 3.5 iwg TSP, see{" "}
                <button
                  onClick={() => setCurrentSlide(8)} // slide 9 is index 8
                  className="text-blue-600 underline hover:text-blue-800 font-semibold"
                >
                  slide 9
                </button>
              </span>
            ),
            calculation: (
              <span>
                Enter{" "}
                <button
                  onClick={() => {
                    setSelectedTable("table1")
                    setShowTableModal(true)
                  }}
                  className="text-blue-600 underline hover:text-blue-800 font-semibold"
                >
                  Table 1
                </button>{" "}
                at intersection of airflow and pressure
              </span>
            ),
            result: "RPM = 1077, BHP = 24.9",
            note: "Based on direct drive plenum supply fan configuration",
          },
          {
            step: "Step 2: Calculate Fan Heat Addition",
            input: "BHP = 24.9 HP",
            calculation: "Supply fan sensible heat = 24.9 HP × 2,750",
            result: "68,475 Btuh fan heat addition",
            note: "Motor heat constant = 2,750 for heat calculation",
          },
          {
            step: "Step 3: Determine Required Unit Capacity",
            input: "Building load + Fan heat",
            calculation: "970,000 Btuh + 68,475 Btuh",
            result: "1,038,475 Btuh = 1,038 MBH (86.5 tons)",
            note: "Total capacity unit must provide",
          },
          {
            step: "Step 4: Unit Selection Validation",
            input: "Required: 86.5 tons",
            calculation: (
              <span>
                From{" "}
                <button
                  onClick={() => {
                    setSelectedTable("table3")
                    setShowTableModal(true)
                  }}
                  className="text-blue-600 underline hover:text-blue-800 font-semibold"
                >
                  Table 3
                </button>{" "}
                capacity data
              </span>
            ),
            result: "90 tons nominal selection is valid",
            note: "Provides adequate capacity margin",
          },
          {
            step: "Step 5: Calculate Leaving Air Temperature",
            input: (
              <span>
                Unit sensible capacity from{" "}
                <button
                  onClick={() => {
                    setSelectedTable("table3")
                    setShowTableModal(true)
                  }}
                  className="text-blue-600 underline hover:text-blue-800 font-semibold"
                >
                  Table 3
                </button>
                : 703 MBH
              </span>
            ),
            calculation: "Net sensible = 703 MBH - 68.47 MBH = 634.53 MBH",
            result: "ΔT = 634,530 / (1.08 × 25,000) = 23.5°F",
            note: "Supply air temperature: 80°F - 23.5°F = 56.5°F DB",
          },
          {
            step: "Step 6: Determine Leaving Wet-Bulb",
            input: "Entering enthalpy: 31.5 Btu/lb at 80°F DB / 67°F WB (from psychrometric chart)",
            calculation: "Δh = 1,050,000 / (4.5 × 25,000) = 9.3 Btu/lb",
            result: "Leaving enthalpy = 31.5 - 9.3 = 22.2 Btu/lb",
            note: (
              <div className="space-y-2">
                <p>
                  From the{" "}
                  <button
                    onClick={() => setShowEnthalpyChart(true)}
                    className="text-blue-600 hover:text-blue-800 underline font-medium"
                  >
                    enthalpy chart
                  </button>
                  , 22.2 Btu/lb enthalpy is a wet bulb of{" "}
                  <button
                    onClick={() => setShowRTUVisualization(true)}
                    className="text-blue-600 hover:text-blue-800 underline font-medium"
                  >
                    53.4°F
                  </button>
                  , so the unit LAT is 56.5°F DB and 53.4°F WB
                </p>
              </div>
            ),
          },
        ],
        psychrometric: {
          link: "https://www.flycarpet.net/en/psyonline",
          note: "Psychrometric chart used for enthalpy and wet-bulb calculations",
        },
        images: {
          psychrometric:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-2Ine3MNtLX4v2ecIANAzdNs2QuJ5Oe.png",
          calculations:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-s6pSoEqtXDK484z4T8wHhb2zhF00Vi.png",
        },
      },
    },
    {
      id: 8,
      title: "Heating System Selection Analysis",
      subtitle: "Gas vs Electric heating module comparison",
      type: "heating-comparison",
      content: {
        requirement: {
          capacity: "800,000 Btuh (800 MBH)",
          note: "Heating load requirement for space",
        },
        gasOption: {
          title: "Gas Heating Module Selection",
          process: "Simple lookup in manufacturer's heating performance data table for 90-ton unit",
          selection: {
            capacity: "1,000 MBH output, see Table 1",
            reason: "Exceeds 800 MBH requirement with appropriate margin",
            availability: "Available on 90 ton unit",
            nomenclature: {
              digit5: "Digit 5: Option C - Staged gas with stainless steel burner",
              digit6B: "Digit 6: select option 4 for 1,000 MBH",
              result: "Result: Model shows C4 for digits 5 and 6B, see picture",
            },
          },
          advantages: ["Lower operating cost", "Fast response", "High efficiency", "Proven technology"],
        },
        electricOption: {
          title: "Electric Heating Module Selection",
          process: "Selection based on kilowatt (kW) rating at specified voltage",
          selection: {
            voltage: "460V-3-60Hz",
            capacity: "280 kW output (955,200 Btuh), see table 1",
            reason: "Exceeds 800,000 Btuh requirement",
            availability: "Available on 90 ton unit",
            nomenclature: {
              digit5: "Option M - Electric heat",
              digit6A: "Option 6 - High silicon controlled rectifier (SCR)",
              result: "Model shows M6 for digits 5 and 6A, see picture",
            },
          },
          advantages: ["No gas connection required", "Precise control", "Clean operation", "Easy installation"],
        },
        comparison: {
          efficiency: "Gas: ~80-95% AFUE, Electric: ~100% but higher utility cost",
          installation: "Gas: Requires gas line, Electric: Only electrical connection",
          maintenance: "Gas: More complex, Electric: Minimal maintenance",
          cost: "Gas: Lower operating cost, Electric: Higher operating cost",
        },
      },
    },
    {
      id: 9,
      title: "Supply Fan Selection & Pressure Analysis",
      subtitle: "Total static pressure calculations and motor sizing",
      type: "fan-analysis",
      content: {
        concept:
          "The RTU's supply fan must overcome resistance both external (ductwork) and internal (unit components) to the unit.",
        pressureBreakdown: {
          esp: {
            title: "External Static Pressure (ESP)",
            value: "2.0 in. w.g.",
            definition: "Sum of pressure losses in ductwork system outside RTU",
            components: [
              "Ductwork friction",
              "Fittings and transitions",
              "Diffusers and grilles",
              "VAV boxes",
              "Dampers",
            ],
          },
          isp: {
            title: "Internal Static Pressure (ISP)",
            value: "1.5 in. w.g.",
            definition: "Sum of pressure losses within RTU components",
            components: [
              { component: "Throwaway Filters", pressure: "0.25 in. w.g." },
              { component: "Cooling Coil", pressure: "0.50 in. w.g." },
              { component: "Heating Section", pressure: "0.30 in. w.g." },
              { component: "Economizer", pressure: "0.25 in. w.g." },
              { component: "Unit Internal", pressure: "0.20 in. w.g." },
            ],
          },
          tsp: {
            title: "Total Static Pressure (TSP)",
            calculation: "TSP = ESP + ISP = 2.0 + 1.5 = 3.5 in. w.g.",
            note: "This is the total pressure the fan must overcome",
          },
        },
        fanSelection: {
          input: "25,000 CFM at 3.5 iwg TSP",
          tableReference: "See table 1",
          results: {
            rpm: "1077 RPM",
            bhp: "24.9 BHP",
            configuration: "Direct drive plenum (DDP) supply fan",
          },
          nomenclature: {
            digit15: "Option D - Direct drive plenum supply fan with 1 in. spring isolation",
            digit16: "Option D - 15 HP x 2 supply fan motor",
            digit17: "Option 2 - ODP premium efficiency, 1,800 RPM",
            result: "DD2 for digits 15-17, see picture",
          },
        },
        motorConsiderations: {
          nameplate: "30 HP total nameplate",
          actual: "24.9 BHP actual requirement",
          margin: "Provides adequate safety margin for varying conditions",
          efficiency: "Premium efficiency motors for energy savings",
        },
      },
    },
    {
      id: 10,
      title: "Exhaust Fan Selection",
      subtitle: "Final system specifications and completion",
      type: "exhaust-summary",
      content: {
        exhaustFan: {
          title: "Exhaust Fan Sizing Calculation",
          requirement: "24,000 CFM exhaust air capacity",
          pressureCalculation: {
            components: [
              { item: "Return duct static pressure (assumed)", value: "0.50 iwg" },
              {
                item: "Exhaust air damper pressure drop, see",
                value: "0.75 iwg",
                source: (
                  <button
                    onClick={() => setShowExhaustTable3(true)}
                    className="text-blue-600 hover:text-blue-800 underline font-medium"
                  >
                    table 3
                  </button>
                ),
              },
              { item: "Total Static Pressure", value: "1.25 iwg", calculation: "0.50 + 0.75" },
            ],
          },
          selection: {
            input: "24,000 CFM at 1.25 iwg TSP",
            results: {
              rpm: "1017 RPM (interpolated)",
              bhp: "14.4 BHP (interpolated)",
            },
            nomenclature: {
              digit19: "Option 2 - Exhaust with VFD and backdraft damper",
              digit20: "Option B - Exhaust fan with 1 in. spring isolation",
              digit21: "Option J - 15 HP exhaust fan motor",
              result: "2BJ for digits 19-21",
            },
          },
        },
      },
    },
    {
      id: 11,
      title: "Project Summary: From Requirements to Complete Specifications",
      subtitle: "Input requirements transformed through psychrometric analysis",
      type: "summary-comparison",
      content: {
        givenData: {
          title: "Given Data (Input Requirements)",
          requirements: [
            { label: "Total Cooling Capacity", value: "970,000 Btuh" },
            { label: "Sensible Cooling", value: "600,000 Btuh" },
            { label: "Required Heating", value: "800,000 Btuh" },
            { label: "Supply Airflow", value: "25,000 CFM" },
            { label: "External Static Pressure", value: "2.0 in. w.g." },
            { label: "Entering Air Conditions", value: "80°F DB / 67°F WB" },
            { label: "Outside Design Temperature", value: "95°F" },
            { label: "Electrical Supply", value: "460V / 3-Phase / 60Hz" },
            { label: "Additional Features", value: "Economizer, VAV control, 2 in. filters" },
          ],
        },
        finalResults: {
          title: "Complete System Specifications (Final Results)",
          cooling: {
            capacity: "90 tons nominal (1,038 MBH actual requirement)",
            sensible: "634.53 MBH net sensible (after fan heat)",
            shr: "0.62 (moderate sensible load)",
          },
          heating: {
            options: "Gas: 1,000 MBH or Electric: 280 kW",
            selection: "Based on utility availability and operating cost preference",
          },
          airflow: {
            supply: "25,000 CFM at 3.5 iwg TSP",
            exhaust: "24,000 CFM at 1.25 iwg TSP",
            motors: "Supply: 30HP, Exhaust: 15HP",
          },
          controls: {
            features: "VAV control, economizer operation",
            filtration: "2 in. throwaway filters",
            electrical: "460V/3-phase/60Hz",
          },
        },
        conclusion: {
          recommendation: "Choose Johnson Controls® Premier Rooftop Unit",
          link: "https://www.johnsoncontrols.com/hvac-equipment/rooftop-units/premier",
          achievements: [
            "Comprehensive psychrometric analysis performed",
            "All load calculations verified with fan heat inclusion",
          ],
        },
      },
    },
  ]

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault()
        nextSlide()
      } else if (e.key === "ArrowLeft") {
        e.preventDefault()
        prevSlide()
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [currentSlide])

  useEffect(() => {
    if (isAutoPlay) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
      }, 8000) // Increased time for detailed content
      return () => clearInterval(interval)
    }
  }, [isAutoPlay, slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const TableModal = ({ isOpen, onClose, tableType }) => {
    if (!isOpen) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
        <div
          className="bg-white p-6 rounded-lg max-w-4xl max-h-[90vh] overflow-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">
              {tableType === "table1"
                ? "Table 1: 90 to 105 ton Total Static Pressure"
                : "Table 3: 90 ton Standard Efficiency — 95°F Ambient Air Temperature"}
            </h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
              &times;
            </button>
          </div>
          <img
            src={
              tableType === "table1"
                ? "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-676DAq359zrWaTz8fvLiyFqnpxfSf6.png"
                : "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jk7HZyyP1Wx0VmQOxzS4XDcP9zKsua.png"
            }
            alt={tableType === "table1" ? "Table 1 - Fan Performance Data" : "Table 3 - Capacity Performance Data"}
            className="w-full h-auto"
          />
        </div>
      </div>
    )
  }

  const renderSlideContent = (slide: any) => {
    switch (slide.type) {
      case "title":
        return (
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent leading-tight">
                {slide.title}
              </h1>
            </div>

            {slide.content.images && (
              <div className="my-8">
                <div className="bg-white rounded-xl shadow-lg p-6 max-w-5xl mx-auto relative">
                  <div className="relative">
                    <img
                      src={slide.content.images[currentImageIndex].src || "/placeholder.svg"}
                      alt={slide.content.images[currentImageIndex].alt}
                      className="w-full h-auto rounded-lg shadow-md"
                    />

                    {/* Navigation arrows */}
                    <button
                      onClick={() =>
                        setCurrentImageIndex(
                          currentImageIndex === 0 ? slide.content.images.length - 1 : currentImageIndex - 1,
                        )
                      }
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-md transition-all duration-200 hover:scale-110"
                    >
                      <ChevronLeft size={20} className="text-gray-700" />
                    </button>

                    <button
                      onClick={() =>
                        setCurrentImageIndex(
                          currentImageIndex === slide.content.images.length - 1 ? 0 : currentImageIndex + 1,
                        )
                      }
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-md transition-all duration-200 hover:scale-110"
                    >
                      <ChevronRight size={20} className="text-gray-700" />
                    </button>
                  </div>

                  <p className="text-sm text-gray-500 mt-3 text-center">
                    {slide.content.images[currentImageIndex].caption}
                  </p>

                  {/* Image indicators */}
                  <div className="flex justify-center mt-3 space-x-2">
                    {slide.content.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentImageIndex ? "bg-blue-500" : "bg-gray-300 hover:bg-gray-400"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
              {slide.content.components.map((component, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-blue-50 to-indigo-100 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105"
                >
                  <p className="text-sm font-medium text-gray-800">{component}</p>
                </div>
              ))}
            </div>
          </div>
        )

      case "detailed-content":
        return (
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-800 mb-6 animate-slide-down">{slide.title}</h2>
            <div className="bg-blue-50 p-6 rounded-xl mb-6 animate-fade-in">
              <p className="text-lg text-gray-700 italic">{slide.content.mainConcept}</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {slide.content.definitions.map((def: any, index: number) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-500 hover:shadow-xl transition-all duration-300 animate-slide-in"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="flex items-center mb-3">
                    <Calculator className="w-6 h-6 text-blue-600 mr-2" />
                    <h3 className="text-xl font-semibold text-blue-700">{def.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-3">{def.description}</p>
                  <div className="bg-blue-50 p-3 rounded-lg mb-3">
                    <code className="text-blue-800 font-mono text-sm font-semibold">{def.formula}</code>
                  </div>
                  <div className="text-sm text-gray-500 mb-2">
                    <strong>Units:</strong> {def.units}
                  </div>
                  <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                    <strong>Details:</strong> {def.details}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case "technical-specs":
        return (
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-800 mb-6 animate-slide-down">{slide.title}</h2>
            <div className="bg-green-50 p-6 rounded-xl mb-6 animate-fade-in">
              <p className="text-lg text-gray-700">{slide.content.intro}</p>
            </div>
            <div className="space-y-4">
              {slide.content.parameters.map((param: any, index: number) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-green-500 animate-slide-in"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center mb-2">
                        <Thermometer className="w-5 h-5 text-green-600 mr-2" />
                        <h3 className="text-lg font-semibold text-green-700">{param.parameter}</h3>
                      </div>
                      <p className="text-gray-600 mb-2">{param.definition}</p>
                      <div className="bg-green-50 p-2 rounded text-sm">
                        <strong>Measurement:</strong> {param.measurement}
                      </div>
                    </div>
                    <div>
                      <div className="mb-2">
                        <strong className="text-gray-700">Importance:</strong>
                        <p className="text-gray-600 text-sm">{param.importance}</p>
                      </div>
                      <div>
                        <strong className="text-gray-700">Calculation:</strong>
                        <p className="text-gray-600 text-sm">{param.calculation}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case "calculation-detailed":
        return (
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-800 mb-6 animate-slide-down">{slide.title}</h2>
            <div className="bg-orange-50 p-6 rounded-xl mb-6 animate-fade-in">
              <p className="text-lg text-gray-700">{slide.content.concept}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-orange-500 animate-slide-in">
                <div className="flex items-center mb-3">
                  <Zap className="w-6 h-6 text-orange-600 mr-2" />
                  <h3 className="text-lg font-semibold text-orange-700">
                    {slide.content.keyDistinction.motorHP.title}
                  </h3>
                </div>
                <p className="text-gray-600 mb-2">{slide.content.keyDistinction.motorHP.definition}</p>
                <div className="bg-orange-50 p-3 rounded-lg text-sm">
                  {slide.content.keyDistinction.motorHP.purpose}
                </div>
              </div>

              <div
                className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-orange-500 animate-slide-in"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="flex items-center mb-3">
                  <Wind className="w-6 h-6 text-orange-600 mr-2" />
                  <h3 className="text-lg font-semibold text-orange-700">
                    {slide.content.keyDistinction.brakeHP.title}
                  </h3>
                </div>
                <p className="text-gray-600 mb-2">{slide.content.keyDistinction.brakeHP.definition}</p>
                <div className="bg-orange-50 p-3 rounded-lg text-sm mb-2">
                  {slide.content.keyDistinction.brakeHP.purpose}
                </div>
                <div className="text-sm text-gray-600 italic">
                  <strong>Example:</strong> {slide.content.keyDistinction.brakeHP.example}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-red-100 to-orange-100 rounded-2xl p-8 animate-zoom-in">
              <h3 className="text-2xl font-bold text-center mb-4 text-red-800">Critical Formula</h3>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-800 mb-4 font-mono">{slide.content.formula.main}</div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-white p-3 rounded-lg">
                    <strong>Constant:</strong> {slide.content.formula.constant}
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <strong>Derivation:</strong> {slide.content.formula.derivation}
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <strong>Assumption:</strong> {slide.content.formula.assumption}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-red-50 p-6 rounded-xl border-l-4 border-red-500 animate-slide-up">
              <h4 className="font-semibold text-red-700 mb-2">⚠️ Critical Consequence</h4>
              <p className="text-gray-700">{slide.content.consequence}</p>
            </div>
          </div>
        )

      case "altitude-analysis":
        return (
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-800 mb-6 animate-slide-down">{slide.title}</h2>
            <div className="bg-purple-50 p-6 rounded-xl mb-6 animate-fade-in">
              <p className="text-lg text-gray-700">{slide.content.concept}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {slide.content.effects.map((effect: any, index: number) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-purple-500 animate-slide-in"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <h3 className="text-xl font-semibold text-purple-700 mb-3">{effect.category}</h3>
                  <div className="space-y-3">
                    <div>
                      <strong className="text-gray-700">Impact:</strong>
                      <p className="text-gray-600 text-sm">{effect.impact}</p>
                    </div>
                    <div>
                      <strong className="text-gray-700">Result:</strong>
                      <p className="text-gray-600 text-sm">{effect.result}</p>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg">
                      <code className="text-purple-800 font-mono text-sm">{effect.formula}</code>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl p-8 animate-zoom-in">
              <h3 className="text-2xl font-bold text-center mb-6 text-purple-800">Equation Corrections</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-700 mb-2">Standard Sea-Level Equation</h4>
                  <code className="text-purple-800 font-mono">{slide.content.equations.standard}</code>
                  <p className="text-sm text-gray-600 mt-2">{slide.content.equations.note}</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-700 mb-2">Altitude Correction</h4>
                  <p className="text-sm text-gray-600 mb-2">{slide.content.equations.altitude}</p>
                  <p className="text-sm text-gray-600">{slide.content.equations.correction}</p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 p-6 rounded-xl border-l-4 border-red-500 animate-slide-up">
              <h4 className="font-semibold text-red-700 mb-2">⚠️ Critical Warning</h4>
              <p className="text-gray-700">{slide.content.importance}</p>
            </div>
          </div>
        )

      case "project-specs":
        return (
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-800 mb-6 animate-slide-down">{slide.title}</h2>
            <div className="bg-blue-50 p-6 rounded-xl mb-6 animate-fade-in">
              <h3 className="text-2xl font-semibold text-blue-800 mb-4">{slide.content.title}</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {slide.content.specifications.map((spec: any, index: number) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-4 shadow-md border-l-4 border-blue-500 animate-slide-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="text-sm text-blue-600 font-medium">{spec.category}</div>
                      <div className="font-semibold text-gray-800">{spec.requirement}</div>
                      <div className="text-sm text-gray-600 mt-1">{spec.note}</div>
                    </div>
                    <div className="bg-blue-100 px-3 py-1 rounded-lg ml-4">
                      <span className="font-bold text-blue-800 text-sm">{spec.value}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl p-6 animate-zoom-in">
              <h3 className="text-xl font-semibold text-green-800 mb-3">Sensible Heat Ratio Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold text-green-700 mb-2">Calculation</h4>
                  <code className="text-green-800 font-mono">{slide.content.shr.calculation}</code>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold text-green-700 mb-2">Interpretation</h4>
                  <p className="text-gray-600 text-sm">{slide.content.shr.interpretation}</p>
                </div>
              </div>
            </div>
          </div>
        )

      case "step-calculations":
        return (
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-800 mb-6 animate-slide-down">{slide.title}</h2>

            <div className="space-y-4">
              {slide.content.steps.map((step: any, index: number) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-orange-500 animate-slide-in"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-orange-700 mb-2">{step.step}</h3>
                      <p className="text-gray-600 text-sm">{step.input}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Calculation</h4>
                      <div className="bg-orange-50 p-3 rounded-lg">
                        <code className="text-orange-800 font-mono text-sm">{step.calculation}</code>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Result</h4>
                      <div className="bg-green-100 p-3 rounded-lg">
                        <span className="font-bold text-green-800">{step.result}</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-2">{step.note}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 p-6 rounded-xl animate-fade-in">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Psychrometric Chart Reference</h3>
              <p className="text-gray-700 mb-2">
                Link:{" "}
                <a
                  href={slide.content.psychrometric.link}
                  className="text-blue-600 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {slide.content.psychrometric.link}
                </a>
              </p>
              <p className="text-sm text-gray-600">{slide.content.psychrometric.note}</p>
            </div>
          </div>
        )

      case "heating-comparison":
        return (
          <div className="space-y-8">
            <div className="text-center mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900">Heating Requirement</h4>
                <p className="text-blue-700">{slide.content.requirement.capacity}</p>
                <p className="text-sm text-blue-600">{slide.content.requirement.note}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
                <h4 className="text-xl font-bold text-orange-900 mb-4">{slide.content.gasOption.title}</h4>
                <p className="text-orange-700 mb-4">{slide.content.gasOption.process}</p>

                <div className="space-y-3">
                  <div className="bg-white p-3 rounded border">
                    <strong>Capacity:</strong>
                    <span
                      className="text-blue-600 cursor-pointer hover:underline ml-1"
                      onClick={() => setShowHeatingTable1(true)}
                    >
                      {slide.content.gasOption.selection.capacity}
                    </span>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <strong>Reason:</strong> {slide.content.gasOption.selection.reason}
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <strong>Availability:</strong> {slide.content.gasOption.selection.availability}
                  </div>

                  <div className="bg-white p-4 rounded border">
                    <h5 className="font-semibold mb-2">Nomenclature Selection:</h5>
                    <div className="space-y-2 text-sm">
                      <div>• {slide.content.gasOption.selection.nomenclature.digit5}</div>
                      <div>• {slide.content.gasOption.selection.nomenclature.digit6B}</div>
                      <div>
                        •{slide.content.gasOption.selection.nomenclature.result.split(", see picture")[0]}
                        <span
                          className="text-blue-600 cursor-pointer hover:underline ml-1"
                          onClick={() => setShowNomenclatureTable(true)}
                        >
                          , see picture
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h4 className="text-xl font-bold text-blue-900 mb-4">{slide.content.electricOption.title}</h4>
                <p className="text-blue-700 mb-4">{slide.content.electricOption.process}</p>

                <div className="space-y-3">
                  <div className="bg-white p-3 rounded border">
                    <strong>Voltage:</strong> {slide.content.electricOption.selection.voltage}
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <strong>Capacity:</strong>
                    {slide.content.electricOption.selection.capacity.split(", see table 1")[0]}
                    <span
                      className="text-blue-600 cursor-pointer hover:underline ml-1"
                      onClick={() => setShowElectricTable(true)}
                    >
                      , see table 1
                    </span>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <strong>Reason:</strong> {slide.content.electricOption.selection.reason}
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <strong>Availability:</strong> {slide.content.electricOption.selection.availability}
                  </div>

                  <div className="bg-white p-4 rounded border">
                    <h5 className="font-semibold mb-2">Nomenclature Selection:</h5>
                    <div className="space-y-2 text-sm">
                      <div>• {slide.content.electricOption.selection.nomenclature.digit5}</div>
                      <div>• {slide.content.electricOption.selection.nomenclature.digit6A}</div>
                      <div>
                        •{slide.content.electricOption.selection.nomenclature.result.split(", see picture")[0]}
                        <span
                          className="text-blue-600 cursor-pointer hover:underline ml-1"
                          onClick={() => setShowElectricNomenclatureTable(true)}
                        >
                          , see picture
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg">
              <h4 className="text-xl font-bold text-gray-900 mb-4">Comparison Summary</h4>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(slide.content.comparison).map(([key, value]) => (
                  <div key={key} className="bg-white p-3 rounded border">
                    <strong className="capitalize">{key}:</strong> {value}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case "fan-analysis":
        return (
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-800 mb-6 animate-slide-down">{slide.title}</h2>

            <div className="bg-purple-50 p-6 rounded-xl mb-6 animate-fade-in">
              <p className="text-lg text-gray-700">{slide.content.concept}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Pressure Breakdown */}
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-purple-700 mb-4">Pressure Analysis</h3>

                {/* ESP */}
                <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-purple-500 animate-slide-in">
                  <h4 className="text-lg font-semibold text-purple-700 mb-2">
                    {slide.content.pressureBreakdown.esp.title}
                  </h4>
                  <div className="text-2xl font-bold text-purple-800 mb-2">
                    {slide.content.pressureBreakdown.esp.value}
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{slide.content.pressureBreakdown.esp.definition}</p>
                  <div className="space-y-1">
                    {slide.content.pressureBreakdown.esp.components.map((comp: string, i: number) => (
                      <div key={i} className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></div>
                        {comp}
                      </div>
                    ))}
                  </div>
                </div>

                {/* ISP */}
                <div
                  className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-purple-500 animate-slide-in"
                  style={{ animationDelay: "0.2s" }}
                >
                  <h4 className="text-lg font-semibold text-purple-700 mb-2">
                    {slide.content.pressureBreakdown.isp.title}
                  </h4>
                  <div className="text-2xl font-bold text-purple-800 mb-2">
                    {slide.content.pressureBreakdown.isp.value}
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{slide.content.pressureBreakdown.isp.definition}</p>
                  <div className="space-y-2">
                    {slide.content.pressureBreakdown.isp.components.map((comp: any, i: number) => (
                      <div key={i} className="flex justify-between items-center bg-purple-50 p-2 rounded">
                        <span className="text-sm">{comp.component}</span>
                        <span className="font-semibold text-purple-700">{comp.pressure}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* TSP */}
                <div
                  className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl p-6 animate-slide-in"
                  style={{ animationDelay: "0.4s" }}
                >
                  <h4 className="text-lg font-semibold text-purple-700 mb-2">
                    {slide.content.pressureBreakdown.tsp.title}
                  </h4>
                  <div className="text-2xl font-bold text-purple-800 mb-2">
                    {slide.content.pressureBreakdown.tsp.calculation}
                  </div>
                  <p className="text-gray-600 text-sm">{slide.content.pressureBreakdown.tsp.note}</p>
                </div>
              </div>

              {/* Fan Selection */}
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-purple-700 mb-4">Fan Selection Process</h3>

                <div className="bg-white rounded-xl p-6 shadow-lg animate-zoom-in">
                  <h4 className="text-lg font-semibold text-purple-700 mb-4">Selection Input</h4>
                  <div className="bg-purple-50 p-4 rounded-lg mb-4">
                    <div className="text-lg font-bold text-purple-800">{slide.content.fanSelection.input}</div>
                    <p className="text-sm text-gray-600">
                      See{" "}
                      <button
                        onClick={() => setShowSupplyFanTable(true)}
                        className="text-blue-600 hover:text-blue-800 underline font-medium cursor-pointer"
                      >
                        table 1
                      </button>
                    </p>
                  </div>

                  <h4 className="text-lg font-semibold text-purple-700 mb-3">Results</h4>
                  <div className="space-y-2">
                    {Object.entries(slide.content.fanSelection.results).map(([key, value], i) => (
                      <div key={key} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                        <span className="capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                        <span className="font-bold text-purple-700">{value as string}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg animate-slide-in" style={{ animationDelay: "0.3s" }}>
                  <h4 className="text-lg font-semibold text-purple-700 mb-3">Nomenclature Selection</h4>
                  <div className="space-y-2 text-sm">
                    {Object.entries(slide.content.fanSelection.nomenclature).map(([key, value], i) => (
                      <div key={key} className="bg-purple-50 p-3 rounded">
                        <strong className="capitalize">{key.replace(/([A-Z])/g, " $1").trim()}:</strong>
                        {key === "result" ? (
                          <p className="text-gray-600">
                            DD2 for digits 15-17,{" "}
                            <button
                              onClick={() => setShowSupplyFanNomenclature(true)}
                              className="text-blue-600 hover:text-blue-800 underline font-medium cursor-pointer"
                            >
                              see picture
                            </button>
                          </p>
                        ) : (
                          <p className="text-gray-600">{value as string}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className="bg-gradient-to-r from-green-100 to-blue-100 rounded-xl p-6 animate-slide-in"
                  style={{ animationDelay: "0.5s" }}
                >
                  <h4 className="text-lg font-semibold text-green-700 mb-3">Motor Considerations</h4>
                  <div className="space-y-2 text-sm">
                    {Object.entries(slide.content.motorConsiderations).map(([key, value], i) => (
                      <div key={key} className="flex justify-between items-start">
                        <span className="capitalize">{key.replace(/([A-Z])/g, " $1").trim()}:</span>
                        <span className="text-gray-600 text-right ml-2">{value as string}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case "exhaust-summary":
        return (
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-800 mb-6 animate-slide-down">{slide.title}</h2>

            <div className="flex justify-center">
              {/* Exhaust Fan */}
              <div className="bg-green-50 rounded-2xl p-6 border-2 border-green-200 animate-slide-in max-w-2xl w-full">
                <h3 className="text-2xl font-semibold text-green-700 mb-4">{slide.content.exhaustFan.title}</h3>
                <div className="bg-white p-4 rounded-lg mb-4">
                  <p className="font-medium text-green-700 mb-2">Requirement: {slide.content.exhaustFan.requirement}</p>
                </div>

                <h4 className="font-semibold text-green-700 mb-3">Pressure Calculation</h4>
                <div className="space-y-2 mb-4">
                  {slide.content.exhaustFan.pressureCalculation.components.map((comp: any, i: number) => (
                    <div key={i} className="bg-white p-3 rounded-lg flex justify-between items-center">
                      <span className="text-sm">{comp.item}</span>
                      <div className="text-right">
                        <span className="font-bold text-green-700">{comp.value}</span>
                        {comp.source && <p className="text-xs text-gray-500">{comp.source}</p>}
                        {comp.calculation && <p className="text-xs text-gray-500">{comp.calculation}</p>}
                      </div>
                    </div>
                  ))}
                </div>

                <h4 className="font-semibold text-green-700 mb-3">Selection Results</h4>
                <div className="bg-white p-4 rounded-lg mb-4">
                  <p className="text-sm mb-2">
                    <strong>Input:</strong> {slide.content.exhaustFan.selection.input}
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(slide.content.exhaustFan.selection.results).map(([key, value]) => (
                      <div key={key} className="bg-green-50 p-2 rounded text-center">
                        <div className="text-xs text-gray-600 capitalize">{key}</div>
                        <div className="font-bold text-green-700">{value as string}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <h4 className="font-semibold text-green-700 mb-3">Nomenclature</h4>
                <div className="space-y-2 text-sm">
                  {Object.entries(slide.content.exhaustFan.selection.nomenclature).map(([key, value]) => (
                    <div key={key} className="bg-white p-2 rounded">
                      <strong>{key.replace(/([A-Z])/g, " $1").trim()}:</strong>
                      {key === "result" ? (
                        <span>
                          {" "}2BJ for digits 19-21,{" "}
                          <button
                            onClick={() => setShowExhaustNomenclature(true)}
                            className="text-blue-600 hover:text-blue-800 underline font-medium cursor-pointer"
                          >
                            see picture
                          </button>
                        </span>
                      ) : (
                        <span> {value as string}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      case "summary-comparison":
        return (
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Given Data Section */}
              <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-200">
                <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                  <Calculator className="mr-2" />
                  {slide.content.givenData.title}
                </h3>
                <div className="space-y-3">
                  {slide.content.givenData.requirements.map((req, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-blue-200">
                      <span className="text-sm font-medium text-gray-700">{req.label}:</span>
                      <span className="text-sm font-bold text-blue-700">{req.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Final Results Section */}
              <div className="bg-green-50 rounded-lg p-6 border-2 border-green-200">
                <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                  <Zap className="mr-2" />
                  {slide.content.finalResults.title}
                </h3>

                {/* Cooling System */}
                <div className="mb-4">
                  <h4 className="font-semibold text-blue-600 mb-2">Cooling System</h4>
                  <div className="text-sm space-y-1">
                    <div>
                      <span className="font-medium">Capacity:</span> {slide.content.finalResults.cooling.capacity}
                    </div>
                    <div>
                      <span className="font-medium">Sensible:</span> {slide.content.finalResults.cooling.sensible}
                    </div>
                    <div>
                      <span className="font-medium">SHR:</span> {slide.content.finalResults.cooling.shr}
                    </div>
                  </div>
                </div>

                {/* Heating System */}
                <div className="mb-4">
                  <h4 className="font-semibold text-red-600 mb-2">Heating System</h4>
                  <div className="text-sm space-y-1">
                    <div>
                      <span className="font-medium">Options:</span> {slide.content.finalResults.heating.options}
                    </div>
                    <div>
                      <span className="font-medium">Selection:</span> {slide.content.finalResults.heating.selection}
                    </div>
                  </div>
                </div>

                {/* Airflow System */}
                <div className="mb-4">
                  <h4 className="font-semibold text-purple-600 mb-2">Airflow System</h4>
                  <div className="text-sm space-y-1">
                    <div>
                      <span className="font-medium">Supply:</span> {slide.content.finalResults.airflow.supply}
                    </div>
                    <div>
                      <span className="font-medium">Exhaust:</span> {slide.content.finalResults.airflow.exhaust}
                    </div>
                    <div>
                      <span className="font-medium">Motors:</span> {slide.content.finalResults.airflow.motors}
                    </div>
                  </div>
                </div>

                {/* Controls & Features */}
                <div className="mb-4">
                  <h4 className="font-semibold text-indigo-600 mb-2">Controls & Features</h4>
                  <div className="text-sm space-y-1">
                    <div>
                      <span className="font-medium">Features:</span> {slide.content.finalResults.controls.features}
                    </div>
                    <div>
                      <span className="font-medium">Filtration:</span> {slide.content.finalResults.controls.filtration}
                    </div>
                    <div>
                      <span className="font-medium">Electrical:</span> {slide.content.finalResults.controls.electrical}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Conclusion Section */}
            <div className="mt-8 bg-gray-50 rounded-lg p-6 border-2 border-gray-200">
              <h3 className="text-xl font-bold text-green-700 mb-4">🎯 Conclusion</h3>
              <div className="text-lg font-semibold text-gray-800 mb-3">{slide.content.conclusion.recommendation}</div>
              <a
                href={slide.content.conclusion.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline text-sm mb-4 block"
              >
                {slide.content.conclusion.link}
              </a>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {slide.content.conclusion.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-sm text-gray-700">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      default:
        return <div>Slide content not found</div>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-gray-800">YORK Systems Presentation</h1>
            <div className="text-sm text-gray-500">
              Slide {currentSlide + 1} of {slides.length}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className="flex items-center space-x-2 px-3 py-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors"
            >
              {isAutoPlay ? <Pause size={16} /> : <Play size={16} />}
              <span className="text-sm">{isAutoPlay ? "Pause" : "Auto Play"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 h-1">
        <div
          className="bg-gradient-to-r from-blue-500 to-purple-500 h-1 transition-all duration-500 ease-out"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl min-h-[700px] p-8">
          {renderSlideContent(slides[currentSlide])}
        </div>
      </div>

      {/* Navigation */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="bg-white rounded-full shadow-lg px-6 py-3 flex items-center space-x-4">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? "bg-blue-500" : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <TableModal isOpen={showTableModal} onClose={() => setShowTableModal(false)} tableType={selectedTable} />

      {showEnthalpyChart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Enthalpy Chart - Wet Bulb to Enthalpy Conversion</h3>
                <button
                  onClick={() => setShowEnthalpyChart(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              <div className="text-center">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-G6zbpmv6YpfUEFwrMMcTp3iT2Jyqjd.png"
                  alt="Enthalpy Chart - Wet Bulb to Enthalpy Conversion"
                  className="w-full max-w-2xl mx-auto rounded-lg shadow-sm"
                />
                <p className="text-sm text-gray-600 mt-2">Wet bulb temperature in tenths of a degree Fahrenheit</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {showHeatingTable1 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Table 1. Staged and Modulating Gas Heat</h3>
                <button
                  onClick={() => setShowHeatingTable1(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-sQ66s232HA4fyczpCOtUlcNJRv5rj7.png"
                  alt="Staged and Modulating Gas Heat Table"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {showNomenclatureTable && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Model Nomenclature Selection</h3>
                <button
                  onClick={() => setShowNomenclatureTable(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-wBnNg2zb9f6XU9A7BxkgnTNfdrRHgn.png"
                  alt="Model Nomenclature Selection Table"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {showElectricTable && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Table 1. Electric Heat Performance Data - 90 to 105 ton</h3>
                <button
                  onClick={() => setShowElectricTable(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-utSqSZXXqIjFzJqkSXlgHFvYiksZyh.png"
                  alt="Electric Heat Performance Table"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {showElectricNomenclatureTable && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Model Nomenclature - Electric Heat Selection</h3>
                <button
                  onClick={() => setShowElectricNomenclatureTable(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ej67Z1WyJESnkwIQOE5vn1IQXNywmu.png"
                  alt="Electric Heat Nomenclature Table"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Supply Fan Table 1 Modal */}
      {showSupplyFanTable && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">
                  Table 1. 90 to 105 ton Total Static Pressure for 1.0 TSP to 4.0 TSP
                </h3>
                <button
                  onClick={() => setShowSupplyFanTable(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                  ×
                </button>
              </div>
              <div className="flex justify-center">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-1dNw859wCZEEhT69749Miq8kyBzH6d.png"
                  alt="Supply Fan Performance Table"
                  className="max-w-full h-auto border border-gray-300 rounded"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Supply Fan Nomenclature Modal */}
      {showSupplyFanNomenclature && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">Supply Fan Nomenclature Selection</h3>
                <button
                  onClick={() => setShowSupplyFanNomenclature(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                  ×
                </button>
              </div>
              <div className="flex justify-center">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-z7dCSXpJwC4UlopQtbxAmF2NrT9SRH.png"
                  alt="Supply Fan Nomenclature Table"
                  className="max-w-full h-auto border border-gray-300 rounded"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {showExhaustTable3 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">
                  Table 3. Exhaust Air Opening - Component Static Pressure Drops
                </h3>
                <button
                  onClick={() => setShowExhaustTable3(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                  ×
                </button>
              </div>
              <div className="flex justify-center">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-BaRg8lnbow7MPBphBBpVFWJkVwnIID.png"
                  alt="Table 3 - Exhaust Air Component Pressure Drops"
                  className="max-w-full h-auto border border-gray-300 rounded"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {showRTUVisualization && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">York RTU Air Flow Visualization</h3>
                <button
                  onClick={() => setShowRTUVisualization(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                  ×
                </button>
              </div>
              <div className="text-center">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-F6G412IOkS2zsWcKhpzANz0jEe6Hqg.png"
                  alt="York RTU cutaway showing air flow and temperatures"
                  className="w-full h-auto rounded-lg shadow-lg"
                />
                <p className="text-sm text-gray-600 mt-3">
                  Cutaway view showing air flow through York RTU with temperature conditions: Outside Air (95°F), Return
                  Air (75°F), and Supply Air (56.5°F)
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {showExhaustNomenclature && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">Building Pressure Control & Return/Exhaust Fan Options (Digits 19-21)</h3>
                <button
                  onClick={() => setShowExhaustNomenclature(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                  ×
                </button>
              </div>
              <div className="flex justify-center">
                <img
                  src="/attached_assets/image_1755660513894.png"
                  alt="Building pressure control and return/exhaust fan nomenclature table showing digits 19-21 options with highlighted selections 2BJ"
                  className="max-w-full h-auto border border-gray-300 rounded"
                />
              </div>
              <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">Selected Options (2BJ):</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li><strong>Digit 19:</strong> Option 2 - Exhaust with VFD and backdraft damper</li>
                  <li><strong>Digit 20:</strong> Option B - Exhaust fan with 1 in. spring isolation</li>
                  <li><strong>Digit 21:</strong> Option J - 15 HP exhaust fan motor</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}



      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slide-up {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @keyframes slide-down {
          from { transform: translateY(-30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @keyframes slide-in {
          from { transform: translateX(-30px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        @keyframes zoom-in {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        @keyframes expand {
          from { width: 0; }
          to { width: 8rem; }
        }

        .animate-fade-in { animation: fade-in 1s ease-out; }
        .animate-slide-up { animation: slide-up 0.8s ease-out 0.3s both; }
        .animate-slide-down { animation: slide-down 0.6s ease-out; }
        .animate-slide-in { animation: slide-in 0.6s ease-out both; }
        .animate-zoom-in { animation: zoom-in 0.6s ease-out 0.2s both; }
        .animate-expand { animation: expand 1.5s ease-out 0.8s both; }
      `}</style>
    </div>
  )
}