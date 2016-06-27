package org.apache.oozie.ambari.view;

import javax.ws.rs.Path;

import org.apache.ambari.view.ViewContext;
import org.apache.ambari.view.commons.hdfs.FileOperationService;
import org.apache.ambari.view.commons.hdfs.UploadService;
import org.apache.ambari.view.commons.hdfs.UserService;

public class FileServices {
	
	private ViewContext context;

	public FileServices(ViewContext viewContext) {
		this.context=viewContext;
	}

	/**
	 * @see UploadService
	 * @return service
	 */
	@Path("/upload")
	public UploadService upload() {
		return new UploadService(context);
	}

	/**
	 * @see org.apache.ambari.view.commons.hdfs.FileOperationService
	 * @return service
	 */
	@Path("/fileops")
	public FileOperationService fileOps() {
		return new FileOperationService(context);
	}

	/**
	 * @see org.apache.ambari.view.commons.hdfs.UserService
	 * @return service
	 */
	@Path("/user")
	public UserService userService() {
		return new UserService(context);
	}
}
