import React from 'react'
import Globe from "react-globe.gl";
import { useRef, useState, useEffect } from "react";

import { sky, map } from 'media'

const GlobeComponent = ({country = "", initialGlobe, allData}) => {
  const globeEl = useRef();

  useEffect(() => {
    if(allData){
      globeEl.current.pointOfView({ lat: 33, lng: 65, altitude: 100 }, 1000);
    }
    setTimeout(() => {
        globeEl.current.pointOfView({ lat: 15.5, lng: -90.25, altitude: 3 }, 1000); 
    }, 1000);
  }, [initialGlobe, allData])
  
  useEffect(() => {
    globeEl.current.controls().autoRotate = true;
    globeEl.current.controls().autoRotateSpeed = 0.1;
    globeEl.current.pointOfView({ lat: 15.5, lng: -90.25, altitude: 3 }); 
  }, [])


  useEffect(() => {
    if(country){
      globeEl.current.pointOfView({ lat: country.lat, lng: country.lng, altitude: 2.5 }, 4000);
    }
  }, [country])
  
  
  if(country){
    country.altitude = 0.1
    country.color = 'white'
  }
  
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const lineColor = (population) => {
  if(population < 10000000){
    return '#ffe0e0'
  } else if(population < 10000000){
    return '#ffbdbd'
  } else if(population < 30000000){
    return '#ff9c9c'
  } else if(population < 50000000){
    return '#ff7878'
  } else if(population < 80000000){
    return '#ff6161'
  } else if(population < 100000000){
    return '#ff4545'
  } else if(population < 150000000){
    return '#ff2626'
  } else if(population < 200000000){
    return '#ab0707'
  } else if(population < 300000000){
    return '#820404'
  } else if(population < 1300000000){
    return '#4d0a0a'
  } else {
    return '#330a0a'
  }
}

  const testData = [
    {
      name: {
        common: "Wallis and Futuna",
        official: "Territory of the Wallis and Futuna Islands",
        nativeName: {
          fra: {
            official: "Territoire des îles Wallis et Futuna",
            common: "Wallis et Futuna"
          }
        }
      },
      latlng: [-13.3, -176.2],
      population: 11750
    },
    {
      name: {
        common: "Iceland",
        official: "Iceland",
        nativeName: {
          isl: {
            official: "Ísland",
            common: "Ísland"
          }
        }
      },
      latlng: [65, -18],
      population: 366425
    }
  ]

  return (
    <div>
      {initialGlobe ? (
        country ? (
          <Globe
          ref={globeEl}
          globeImageUrl={map}
          backgroundImageUrl={sky}
          htmlElementsData={[country]}
          htmlAltitude='altitude'
          htmlTransitionDuration={2000}
          htmlElement={(data) => {
            const { label, color } = data;
            const element = document.createElement('div');
            element.style.color = color;
            element.innerHTML = `
            <div>
              <svg viewBox="0 0 24 24" style="width:24px;margin:0 auto;">
                <path fill="currentColor" fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/>
              </svg>
              <strong style="font-size:10px;text-align:center">${label}</strong>
            </div>`;
            return element;
          }}
        />
        ) : (
          <>
          <Globe
          ref={globeEl}
          globeImageUrl={map}
          backgroundImageUrl={sky}
          hexBinPointsData={testData}
          hexBinPointLat={d => d.latlng[0]}
          hexBinPointLng={d => d.latlng[1]}
          hexBinPointWeight={10}
          hexAltitude={0}
          hexTopColor={() => '#ffffff'}
          hexSideColor={(d) => lineColor(d.points[0].population)}
          hexLabel={d => `${numberWithCommas(d.points[0].name.common)} <br /> ${numberWithCommas(d.points[0].population)}`}
        />
          </>
        )
      ) : (
        allData ? (
          <Globe
          ref={globeEl}
          globeImageUrl={map}
          backgroundImageUrl={sky}
          hexBinPointsData={allData}
          hexBinPointLat={d => d.latlng[0]}
          hexBinPointLng={d => d.latlng[1]}
          hexBinPointWeight={10}
          hexAltitude={d => d.points[0].population * 0.000000005}
          hexTopColor={() => '#ffffff'}
          hexSideColor={(d) => lineColor(d.points[0].population)}
          hexLabel={d => `${numberWithCommas(d.points[0].name.common)} <br /> ${numberWithCommas(d.points[0].population)}`}

        />
        ) : (
          <Globe
          ref={globeEl}
          globeImageUrl={map}
          backgroundImageUrl={sky}
        />
        )
      )}

        
    </div>
  )
}

export default GlobeComponent