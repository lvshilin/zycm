package zycm.manager.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import zycm.manager.commons.CommonsUtils;
import zycm.manager.entity.PageEntity;
import zycm.manager.entity.StoreEntity;
import zycm.manager.mapper.StoreMapper;
import zycm.manager.service.StoreService;

@Service
public class StoreServiceImpl implements StoreService{
	
	@Autowired
	private StoreMapper storeMapper;
	
	@Override
	public int addStore(StoreEntity stroeEntity) {
		stroeEntity.setId(CommonsUtils.getUUID());
		return storeMapper.addStore(stroeEntity);
	}

	@Override
	public List<StoreEntity> queryStoreList(PageEntity pageEntity) {
		return storeMapper.queryStoreList(pageEntity);
	}

	@Override
	public int queryStoreNum() {
		return storeMapper.queryStoreNum();
	}

	@Override
	public int delStore(StoreEntity stroeEntity) {
		return storeMapper.delStore(stroeEntity);
	}

}
