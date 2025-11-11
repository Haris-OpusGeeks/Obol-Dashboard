import endPoints from '../Constants/endpoints';
import { fetchApi } from '../Utils/helper';

class DashboardServices {
    dashboardData = async () => {
    const response = await fetchApi({
      method: 'GET',
      endPoint: endPoints.DASHBOARD,
      token: true,
    });
    return response;
    
  };

  transactionData = async () => {
    const response = await fetchApi({
      method: 'GET',
      endPoint: endPoints.TRANSACTION_DATA,
      token: true,
    });
    return response;
    
  };

    statisticsData = async () => {
    const response = await fetchApi({
      method: 'GET',
      endPoint: endPoints.STATISTICS_DATA,
      token: true,
    });
    return response;
    
  };
  
}

const dashboardServices = new DashboardServices();
export default dashboardServices;