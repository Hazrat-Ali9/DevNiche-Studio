import { useAuth } from "../store/auth";
import serviceDesign from "../assets/images/design.png";
import { BallTriangle } from "react-loader-spinner";
export default function Service() {
  const { services, isLoading } = useAuth();
  if(isLoading){
    return (
          <div className="loading-spin">
            <BallTriangle 
              height={100}
              width={100}
              radius={5}
              color="#4fa94d"
              ariaLabel="ball-triangle-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            /> 
          </div>
    )
  }
  return (
    <section className="section-services">
      <div className="container">
        <h1 className="main-heading">Services</h1>
      </div>

      <div className="container grid grid-three-cols">
        {(
          services.map((value, index) => (
            <div className="card" key={index}>
              <div className="card-img">
                <img src={serviceDesign} alt="our services info" width="200" />
              </div>
              <div className="card-details">
                <div className="grid grid-two-cols">
                  <p>{value.provider}</p>
                  <p>{value.price}</p>
                </div>
                <h2>{value.service}</h2>
                <p>{value.description}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
